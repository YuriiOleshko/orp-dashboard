/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  useHistory, useLocation, useParams,
} from 'react-router';
import { useIntl } from 'react-intl';
// import axios from 'axios';

import { GAS, parseNearAmount } from 'src/state/near';
import { getContract, contractMethods } from '../../utils/near-utils';
import { appStore } from '../../state/app';
import { initIPFS, getJSONFileFromIpfs } from '../../state/ipfs';

import CustomBtn from '../../generic/CustomBtn';
import CustomChart from './CustomChart';
import ProjectInfo from './ProjectInfo';
import ProjectBenefits from './ProjectBenefits';
import StageTimeline from './StageTimeline';
import WrapperScaleImg from '../../components/WrapperScaleImg/WrapperScaleImg';

import {
  title,
  fundersTitle,
  benefitsTitle,
  descriptionTitle,
  edit,
  documentationTitle,
  locationTitle,
} from './LangProjectPage';
import Loader from '../../components/Loader';

const ProjectPage = () => {
  const history = useHistory();
  const location = useLocation();
  const intl = useIntl();
  const { nameId } = useParams();
  const [data, setData] = useState({});
  const [stageData, setStageData] = useState([]);
  const [loadingData, setLoading] = useState(true);
  const { state } = useContext(appStore);
  const { account } = state;

  let filesCounter = 0;
  let hasPublic;

  if (data.privateFiles && data.privateFiles.length) {
    hasPublic = data.privateFiles.find((item) => !item.private);
  }

  const createStageVoting = async (stageId) => {
    if (account && account.accountId) {
      const contract = getContract(account, contractMethods, 0);
      const deposit = parseNearAmount('1');
      await contract.add_stage_voting(
        {
          project_id: nameId,
          stage_id: stageId,
        },
        GAS,
        deposit,
      );
    }
  };

  const payStageVoting = async (amount, stageId) => {
    if (account && account.accountId) {
      const contract = getContract(account, contractMethods, 1);
      const deposit = '1';
      const stages = await contract.ft_transfer_call(
        {
          receiver_id: 'c1.ofp.testnet',
          amount,
          memo: null,
          msg: JSON.stringify(
            {
              details: 0,
              project_id: nameId,
              stage_id: stageId,
              period_id: 0,
            },
          ),
        },
        GAS,
        deposit,
      );
    }
  };

  const setStageStatus = (stages, totalData, stageVotingArr) => {
    const copyStages = [...stages];
    const updStages = copyStages.map((item, id) => {
      const current = Date.now();
      const oneMillion = 1e6;
      const startMilisec = item.starts_at / oneMillion;
      const endMilisec = item.ends_at / oneMillion;

      const stageVoting = stageVotingArr[id];

      const stageStatus = {
        active: startMilisec <= current && current <= endMilisec,
        status: stageVoting && stageVoting.approved,
      };

      const dataUploadFinished = (totalData.subZonesPolygon || []).find((i) => i?.stage === item.id);

      const dataUpload = dataUploadFinished && dataUploadFinished.finished;
      const pastTerm = current >= startMilisec;

      // const status = ['ok', 'lost', 'future'];
      // const randomStatus = status[Math.round(Math.random() * 1)];
      // const collateral = dataUpload ? randomStatus : status[2];
      // return { ...item, dataUpload, pastTerm, collateral, starts_at: startMilisec, ends_at: endMilisec };
      return { ...item, dataUpload, pastTerm, stageStatus, starts_at: startMilisec, ends_at: endMilisec };
    });
    setStageData(updStages);
  };

  useEffect(async () => {
    if (location.state && account) {
      const contract = getContract(account, contractMethods, 0);
      const stages = await contract.get_project_stages({ project_id: nameId });
      if (stages.length) {
        const stageVotingArr = await Promise.all(
          stages.map(async (item) => {
            const stageVoting = await contract.get_stage_voting({ project_id: nameId, stage_id: item.id });
            return stageVoting;
          }),
        );
        setStageStatus(stages, location.state, stageVotingArr);
        setData(location.state);
        setLoading(false);
      }
    } else if (account) {
      const ipfs = await initIPFS();
      const contract = getContract(account, contractMethods, 0);
      const token = await contract.get_project({ project_id: nameId });
      const stages = await contract.get_project_stages({ project_id: nameId });
      if (token && stages.length) {
        const file = await getJSONFileFromIpfs(ipfs, token.info.cid);
        const stageVotingArr = await Promise.all(
          stages.map(async (item) => {
            const stageVoting = await contract.get_stage_voting({ project_id: nameId, stage_id: item.id });
            return stageVoting;
          }),
        );
        setStageStatus(stages, file, stageVotingArr);
        setData(file);
        setLoading(false);
        return;
      }
      history.push('/404');
    }
  }, [account]);

  return (
    <div className="project__item">
      {loadingData ? <div className="dashboard__loader"><Loader /></div>
        : (
          <div className="project__item-wrapper">
            <div className="project__header">
              <CustomBtn label={intl.formatMessage(title)} customClass="btn__back" iconClass="icon-arrow" type="button" handleClick={() => { history.push('/'); }} />
              {data.name && <span className="header-name">{data.name}</span>}
              <CustomBtn label={intl.formatMessage(edit)} customClass="btn__edit-grey" iconClass="icon-pencil" type="button" handleClick={() => history.push({ pathname: `/edit/${nameId}`, state: data })} />
            </div>
            <div className="project__stage">
              <StageTimeline data={stageData} createStageVoting={createStageVoting} payStageVoting={payStageVoting} />
            </div>
            {/* {!!(data.funders) && (
            <div className="project__funders">
              <span className="funders-title">{intl.formatMessage(fundersTitle)}</span>
              <CustomChart data={data.funders} />
            </div>
            )} */}
            <div className="project__info">
              <ProjectInfo data={data} />
            </div>
            {!!(data.benefits && data.benefits.length) && (
            <div className="project__benefits">
              <span className="benefits-title">{intl.formatMessage(benefitsTitle)}</span>
              <ProjectBenefits data={data.benefits} />
            </div>
            )}
            {!!(data.details || (data.privateFiles.length && hasPublic)) && (
            <div className="project__text">
              {data.details && (
              <div className="project__description">
                <span className="description-title">{intl.formatMessage(descriptionTitle)}</span>
                <span className="description-text">{data.details}</span>
              </div>
              )}
              {!!(data.privateFiles && data.privateFiles.length && hasPublic) && (
              <div className="project__files">
                <span className="files-title">{intl.formatMessage(documentationTitle)}</span>
                <div className="files-list">
                  {data.privateFiles.map((item, index) => (!item.private && (
                  <div className="file-item" key={`${item.path}${index + Date.now()}`}>
                    {++filesCounter}. {item.path}
                  </div>
                  )))}
                </div>
              </div>
              )}
            </div>
            )}
            <div className="project__location">
              {data.region && (
              <span className="location-title">
                {intl.formatMessage(locationTitle)}: {data.region}
              </span>
              )}
              {data.cidScreenShot && (
              <div className="location-img">
                <WrapperScaleImg cid={data.cidScreenShot} />
              </div>
              )}
            </div>
            <div className="project__footer">
              <CustomBtn label={intl.formatMessage(edit)} customClass="btn__edit-primary" iconClass="icon-pencil" type="button" handleClick={() => history.push({ pathname: `/edit/${nameId}`, state: data })} />
            </div>
          </div>
        )}
    </div>
  );
};

export default ProjectPage;
