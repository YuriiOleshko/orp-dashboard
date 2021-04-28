import React, {
  useContext,
  useEffect,
} from 'react';
import { useIntl } from 'react-intl';
import {
  title,
  filterStatus,
  filterName,
  filterLocation,
  filterArea,
  filterDuration,
} from './LangExistingProject';
import ProjectCard from '../../components/ProjectCard';
import Loader from '../../components/Loader';
import { getNftContract, nftContractMethods } from '../../utils/near-utils';
import { appStore } from '../../state/app';
import { initIPFS, getJSONFileFromIpfs } from '../../state/ipfs';

const ExistingProject = () => {
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { account, app } = state;

  const loadTokens = async () => {
    const ipfs = await initIPFS();
    const nftContract = getNftContract(account, nftContractMethods);
    let tokenIds = [];

    try {
      tokenIds = await nftContract.get_account({
        account_id: account.accountId,
      });
    } catch (e) {
      console.log(e);
    }

    // Get nft tokens from near network
    const data = await Promise.all(
      tokenIds.map(async (id) => {
        const item = await nftContract.nft_token({ token_id: id });
        return {
          id,
          ...item,
        };
      }),
    );

    // Get all files saved to ipfs for each nft token
    const allTokens = await Promise.all(
      data.map(async (token) => {
        const item = await getJSONFileFromIpfs(ipfs, token.metadata);
        return {
          cid: token.metadata,
          item,
        };
      }),
    );
    update('app.nftTokens', allTokens);
  };

  useEffect(async () => {
    if (account && account.accountId) await loadTokens();
  }, [account]);

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
      {app.nftTokens.length ? (
        <div className="dashboard__list">
          {app.nftTokens.map((data, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <ProjectCard data={data} key={`${index} - ${data.cid}`} />
          ))}
        </div>
      ) : <div className="dashboard__loader"><Loader /></div>}
    </>
  );
};

export default ExistingProject;
