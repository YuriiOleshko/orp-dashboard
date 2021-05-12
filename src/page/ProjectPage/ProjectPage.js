/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useIntl } from 'react-intl';
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

const ProjectPage = () => {
  const history = useHistory();
  const location = useLocation();
  const intl = useIntl();

  const data = location.state;
  const { name, benefits, details, region, cidScreenShot, privateFiles, funders } = data;
  let filesCounter = 0;
  let hasPublic;

  if (privateFiles.length) {
    hasPublic = privateFiles.find((item) => !item.private);
  }

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
      <div className="project__item-wrapper">
        <div className="project__header">
          <CustomBtn label={intl.formatMessage(title)} customClass="btn__back" iconClass="icon-arrow" type="button" handleClick={() => { history.push('/'); }} />
          {name && <span className="header-name">{name}</span>}
          <CustomBtn label={intl.formatMessage(edit)} customClass="btn__edit-grey" iconClass="icon-pencil" type="button" handleClick={() => { }} />
        </div>
        <div className="project__stage">
          <StageTimeline data={stateData} />
        </div>
        {!!(funders && funders.length) && (
          <div className="project__funders">
            <span className="funders-title">{intl.formatMessage(fundersTitle)}</span>
            <CustomChart data={funders} />
          </div>
        )}
        <div className="project__info">
          <ProjectInfo data={data} />
        </div>
        {!!(benefits && benefits.length) && (
          <div className="project__benefits">
            <span className="benefits-title">{intl.formatMessage(benefitsTitle)}</span>
            <ProjectBenefits data={benefits} />
          </div>
        )}
        {!!(details || (privateFiles.length && hasPublic)) && (
          <div className="project__text">
            {details && (
              <div className="project__description">
                <span className="description-title">{intl.formatMessage(descriptionTitle)}</span>
                <span className="description-text">{details}</span>
              </div>
            )}
            {!!(privateFiles.length && hasPublic) && (
              <div className="project__files">
                <span className="files-title">{intl.formatMessage(documentationTitle)}</span>
                <div className="files-list">
                  {privateFiles.map((item, index) => (!item.private && (
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
          {region && (
            <span className="location-title">
              {intl.formatMessage(locationTitle)}: {region}
            </span>
          )}
          {cidScreenShot && (
            <div className="location-img">
              <WrapperScaleImg cid={cidScreenShot} />
            </div>
          )}
        </div>
        <div className="project__footer">
          <CustomBtn label={intl.formatMessage(edit)} customClass="btn__edit-primary" iconClass="icon-pencil" type="button" handleClick={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
