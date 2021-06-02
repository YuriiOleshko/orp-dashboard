/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
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

import { getNftContract, nftContractMethods } from '../../utils/near-utils';
import { appStore } from '../../state/app';
import { initIPFS, getJSONFileFromIpfs } from '../../state/ipfs';

import CustomBtn from '../../components/CustomBtn';
import CustomChart from '../../components/CustomChart';
import ProjectInfo from '../../components/ProjectInfo';
import ProjectBenefits from '../../components/ProjectBenefits';
import StageTimeline from '../../components/StageTimeline';
import WrapperScaleImg from '../../components/WizardForm/Steps/AnotherComponents/WrapperScaleImg';

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
  const [loadingData, setLoading] = useState(true);
  const { state } = useContext(appStore);
  const { account } = state;

  // const data = location.state;
  // const { name, benefits, details, region, cidScreenShot, privateFiles, funders } = data;
  let filesCounter = 0;
  let hasPublic;

  if (data.privateFiles && data.privateFiles.length) {
    hasPublic = data.privateFiles.find((item) => !item.private);
  }

  useEffect(async () => {
    if (location.state) {
      setData(location.state);
      setLoading(false);
    } else if (account) {
      const ipfs = await initIPFS();
      const contract = getNftContract(account, nftContractMethods);
      const token = await contract.nft_token({ token_id: nameId });
      if (token) {
        const file = await getJSONFileFromIpfs(ipfs, token.metadata.media);
        setData(file);
        setLoading(false);
        return;
      }
      history.push('/404');
    }
  }, [account]);

  const stateData = [
    {
      dataUpload: true,
      collateral: true,
      pastTerm: true,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: true,
      collateral: true,
      pastTerm: true,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: true,
      collateral: false,
      pastTerm: true,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: false,
      collateral: undefined,
      pastTerm: false,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: false,
      collateral: undefined,
      pastTerm: false,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: false,
      collateral: undefined,
      pastTerm: false,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: false,
      collateral: undefined,
      pastTerm: false,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: false,
      collateral: undefined,
      pastTerm: false,
      start: '14/05/21',
      end: '16/11/21',
    },
    {
      dataUpload: false,
      collateral: undefined,
      pastTerm: false,
      start: '14/05/21',
      end: '16/11/21',
    },
  ];

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
              <StageTimeline data={stateData} />
            </div>
            {!!(data.funders && data.funders.length) && (
            <div className="project__funders">
              <span className="funders-title">{intl.formatMessage(fundersTitle)}</span>
              <CustomChart data={data.funders} />
            </div>
            )}
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
