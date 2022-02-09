/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
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
import { initialQuery } from 'src/utils/api-request';
import ProjectCard from './ProjectCard';
import Filter from './Filter';
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

const AGENT_API = process.env.REACT_APP_AGENT_API;
const INDEXER_API = process.env.REACT_APP_INDEXER_API;

const ExistingProject = () => {
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { account, app } = state;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [menuArr, setMenuArr] = useState(app.nftTokens.map((el) => false));
  const [filterParams, setFilterParams] = useState(initialQuery);
  const [sortType, setSortType] = useState({ type: 'deadline', value: 'asc' });

  if (app.nftTokens.length && loading) {
    setLoading(false);
  }

  // console.log(filterParams, 'asdasdasdasd');

  const loadTokens = async (fromIndex, body) => {
    try {
      const projects = await fetch(INDEXER_API, {
        method: 'POST',
        body: JSON.stringify({ ...body, from: fromIndex }),
      }).then((data) => data.json());

      if (projects.hits.hits) {
        const parsedProjects = projects.hits.hits.map((item) => {
          const runtimeFields = {};
          for (const prop in item.fields) {
            runtimeFields[prop] = item.fields[prop][0];
          }
          return { id: item._id, item: { ...item._source, ...runtimeFields } };
        });

        const result = await fetch(`${AGENT_API}/list`, {
          headers: {
            // "Accept": '*/*',
            Authorization: `Bearer ${account.accountId}`,
          },
        }).then((res) => res.json());

        setMenuArr(parsedProjects.map(() => false));
        update('app.nftTokens', parsedProjects);
        update('app.allFa', result);
        setLoading(false);
      } else {
        update('app.nftTokens', []);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setErr(true);
      setLoading(false);
    }
  };

  useEffect(async () => {
    if (account && account.accountId) {
      setFilterParams((prev) => ({
        ...prev,
        query: {
          bool: {
            must: [
              {
                match: {
                  signer_id: account.accountId,
                },
              },
            ],
          },
        },
      }));
    }
  }, [account]);

  useEffect(async () => {
    const hasSigner = filterParams.query.bool.must.find((item) => item?.match?.signer_id);
    if (hasSigner) await loadTokens(0, filterParams);
  }, [filterParams]);

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

  const sortNftTokens = (e, type) => {
    e.target.classList.toggle('active');
    setSortType((prev) => {
      if (prev.type === type) {
        return { type, value: prev.value === 'asc' ? 'desc' : 'asc' };
      }
      return { type, value: 'asc' };
    });
  };

  return (
    <>
      <div className="dashboard__panel">
        <h2 className="dashboard__title">{intl.formatMessage(title)}</h2>
      </div>
      <div className="dashboard__filter">
        <Filter setFilterParams={setFilterParams} sortType={sortType} />
      </div>
      <div className="dashboard__sorting-wrapper">
        <div className="dashboard__sorting-calling">
          <div className="dashboard__sorting dashboard__sorting-status">
            {intl.formatMessage(filterStatus)}
            {/* <i className="icon-play" /> */}
          </div>
          <div className="dashboard__sorting dashboard__sorting-name">
            {intl.formatMessage(filterName)}
            {/* <i className="icon-play" /> */}
          </div>
          <div className="dashboard__sorting dashboard__sorting-stage">
            Stage
            {/* <i className="icon-play" /> */}
          </div>
        </div>
        <div className="dashboard__sorting-info">
          <div className="dashboard__sorting dashboard__sorting-location">
            {intl.formatMessage(filterLocation)}
            {/* <i className="icon-play" /> */}
          </div>
          <div className="dashboard__sorting dashboard__sorting-area" onClick={(e) => sortNftTokens(e, 'parsedSquare')}>
            {intl.formatMessage(filterArea)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__sorting dashboard__sorting-duration" onClick={(e) => sortNftTokens(e, 'deadline')}>
            {intl.formatMessage(filterDuration)}
            <i className="icon-play" />
          </div>
          <div className="dashboard__sorting-space">.</div>
        </div>
      </div>
      {err ? (<div className="dashboard__error">{intl.formatMessage(ipfsError)}</div>)
        : loading ? <div className="dashboard__loader"><Loader /></div>
          : app.nftTokens.length && app.allFa.length ? (
            <div className="dashboard__list">
              {app.nftTokens.map((data, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <ProjectCard data={data} key={`${index} - ${data.id}`} menuArr={menuArr} setMenuArr={setMenuArr} index={index} allFa={app.allFa} />
              ))}
            </div>
          ) : <div className="dashboard__loader">{intl.formatMessage(noProjects)}</div>}
    </>
  );
};

export default ExistingProject;
