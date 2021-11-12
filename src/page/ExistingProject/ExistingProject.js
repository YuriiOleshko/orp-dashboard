/* eslint-disable no-unused-vars */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import Loader from 'src/components/Loader';
import { parseNearAmount } from 'src/state/near';
import { getContract, contractMethods } from 'src/utils/near-utils';
import { appStore } from 'src/state/app';
import { initIPFS, getJSONFileFromIpfs } from 'src/state/ipfs';
import ProjectCard from './ProjectCard';
import {
  title,
  filterStatus,
  filterName,
  filterLocation,
  filterArea,
  filterDuration,
  noProjects,
  ipfsError,
} from './LangExistingProject';

let once = true;

const ExistingProject = () => {
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { account, app } = state;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [menuArr, setMenuArr] = useState(app.nftTokens.map((el) => false));

  if (app.nftTokens.length && loading) {
    setLoading(false);
  }

  const loadTokens = async (fromIndex) => {
    const ipfs = await initIPFS();
    const contract = getContract(account, contractMethods, 0);
    let tokenIds = [];

    try {
      tokenIds = await contract.get_account_projects({ account_id: account.accountId, from_index: fromIndex, limit: 20 });
      if (tokenIds.length === 0) {
        setLoading(false);
        return;
      }
      // Get all files saved to ipfs for each nft token
      const data = await Promise.all(
        tokenIds.map(async (token) => {
          const item = await getJSONFileFromIpfs(ipfs, token.info.cid);
          return {
            id: token.token_id,
            item,
          };
        }),
      );
      // Get current stage for each nft token (need for Data Upload)
      const currentProjectStage = await Promise.all(
        data.map(async (proj) => {
          const currentStage = await contract.get_current_project_stage({ project_id: proj.id });
          return currentStage ? currentStage.id : -1;
        }),
      );
      if (!state.firstLoad) {
        const updStages = [...app.currentProjectStage];
        const updNft = [...app.nftTokens];
        updStages.push(...currentProjectStage);
        updNft.push(...data);
        setMenuArr(updNft.map((el) => false));
        update('app.currentProjectStage', updStages);
        update('app.nftTokens', updNft);
      } else {
        setMenuArr(data.map(() => false));
        update('app.currentProjectStage', currentProjectStage);
        update('app.nftTokens', data);
        update('firstLoad', false);
      }
      setLoading(false);
    } catch (e) {
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (account && account.accountId && !app.nftTokens.length) await loadTokens(0);
  }, [account]);

  useEffect(() => {
    if (account && account.accountId && app.nftTokens.length) {
      const handler = async (e) => {
        const scrollHeight = window.pageYOffset + document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const triggerHeight = pageHeight - scrollHeight;
        if (triggerHeight <= 500 && once) {
          once = false;
          await loadTokens(app.nftTokens.length);
        } else if (triggerHeight > 500) {
          once = true;
        }
      };

      window.addEventListener('scroll', handler);

      return () => window.removeEventListener('scroll', handler);
    }
  }, [account, app.nftTokens.length, state.firstLoad]);

  useEffect(() => {
    const closeToggleMenu = (e) => {
      const toggleMenu = document.querySelectorAll('.dashboard__info__window');
      if (!e.target.closest('.dashboard__info__window') && !e.target.closest('.dashboard__setting')) {
        toggleMenu.forEach((el) => el.classList.remove('null'));
        toggleMenu.forEach((el) => el.classList.add('hiden'));
        setMenuArr((prev) => prev.map(() => false));
      }
    };
    window.addEventListener('click', closeToggleMenu);
    return () => window.removeEventListener('click', closeToggleMenu);
  }, []);

  const filterNftTokens = (e) => {
    e.target.classList.toggle('active');
  };

  return (
    <>
      <div className="dashboard__panel">
        <h2 className="dashboard__title">{intl.formatMessage(title)}</h2>
      </div>
      <div className="dashboard__filters">
        <div className="dashboard__filter-calling">
          <div className="dashboard__filter dashboard__filter-status active" onClick={filterNftTokens}>
            {intl.formatMessage(filterStatus)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__filter dashboard__filter-name" onClick={filterNftTokens}>
            {intl.formatMessage(filterName)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__filter dashboard__filter-stage" onClick={filterNftTokens}>
            Stage
            <i className="icon-play" />
          </div>
        </div>
        <div className="dashboard__filter-info">
          <div className="dashboard__filter dashboard__filter-location" onClick={filterNftTokens}>
            {intl.formatMessage(filterLocation)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__filter dashboard__filter-area" onClick={filterNftTokens}>
            {intl.formatMessage(filterArea)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__filter dashboard__filter-duration" onClick={filterNftTokens}>
            {intl.formatMessage(filterDuration)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__filter-space">.</div>
        </div>
      </div>
      {err ? (<div className="dashboard__error">{intl.formatMessage(ipfsError)}</div>)
        : loading ? <div className="dashboard__loader"><Loader /></div>
          : app.nftTokens.length && app.currentProjectStage.length ? (
            <div className="dashboard__list">
              {app.nftTokens.map((data, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <ProjectCard data={data} currentStage={app.currentProjectStage[index]} key={`${index} - ${data.id}`} menuArr={menuArr} setMenuArr={setMenuArr} index={index} />
              ))}
            </div>
          ) : <div className="dashboard__loader">{intl.formatMessage(noProjects)}</div>}
    </>
  );
};

export default ExistingProject;
