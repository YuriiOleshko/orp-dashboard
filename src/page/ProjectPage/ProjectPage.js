/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import CustomBtn from '../../components/CustomBtn';
import CustomChart from '../../components/CustomChart';
import ProjectInfo from '../../components/ProjectInfo';
import ProjectBenefits from '../../components/ProjectBenefits';
import StageTimeline from '../../components/StageTimeline';
import WrapperScaleImg from '../../components/WizardForm/Steps/AnotherComponents/WrapperScaleImg';

// Benefit's icons
import icon1 from '../../assets/image/benefints/icon1.svg';
import icon2 from '../../assets/image/benefints/icon2.svg';
import icon3 from '../../assets/image/benefints/icon3.svg';
import icon4 from '../../assets/image/benefints/icon4.svg';
import icon5 from '../../assets/image/benefints/icon5.svg';
import icon6 from '../../assets/image/benefints/icon6.svg';
import icon7 from '../../assets/image/benefints/icon7.svg';

import {
  title,
  fundersTitle,
  benefitsTitle,
  descriptionTitle,
  descriptionText,
  edit,
  documentationTitle,
  publicField,
  privateField,
  locationTitle,
} from './LangProjectPage';

const ProjectPage = () => {
  const history = useHistory();
  const intl = useIntl();
  // const { name } = useParams();
  const fundersData = [
    {
      name: 'Nike',
      value: 50,
    },
    {
      name: 'Coca-Cola',
      value: 25,
    },
    {
      name: 'WWF',
      value: 25,
    },
  ];

  const colors = ['#78E4FF', '#2EC3E9', '#1AA7CA'];

  const infoData = {
    size: {
      sqKm: 345.789,
      trees: 17856,
    },
    totalDuration: {
      start: '14/05/2021',
      end: '14/01/2024',
      total: 32,
    },
    remainingDuration: {
      start: '01/09/2022',
      end: '14/01/2024',
      total: 15.5,
    },
    uploads: {
      value: 4,
    },
    currentOCC: {
      value: 19,
    },
    projectedOCC: {
      value: 87.945,
    },
  };

  const benefitsData = [{ src: icon1, indexId: 1, active: true }, { src: icon2, indexId: 2, active: true }, { src: icon3, indexId: 3, active: true },
    { src: icon4, indexId: 4, active: true }, { src: icon5, indexId: 5, active: true }, { src: icon6, indexId: 6, active: true }, {
      src: icon7,
      indexId: 7,
      active: true,
    },
  ];

  const location = 'Oregon, US';

  const mapCID = 'QmPFzkAmcsFG1cx8RoK2yU7nKwD8uAcEBjGzb9zcgqPNLq';

  const files = [
    {
      name: 'IMG_48_73465746_77.JPG',
      public: true,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: false,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: true,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: true,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: true,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: false,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: true,
    },
    {
      name: 'IMG_48_73465746_77.JPG',
      public: false,
    },
  ];

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
          <span className="header-name">Project Name </span>
          <CustomBtn label={intl.formatMessage(edit)} customClass="btn__edit-grey" iconClass="icon-pencil" type="button" handleClick={() => { }} />
        </div>
        <div className="project__stage">
          <StageTimeline data={stateData} />
        </div>
        <div className="project__funders">
          <span className="funders-title">{intl.formatMessage(fundersTitle)}</span>
          <CustomChart data={fundersData} colors={colors} />
        </div>
        <div className="project__info">
          <ProjectInfo data={infoData} />
        </div>
        <div className="project__benefits">
          <span className="benefits-title">{intl.formatMessage(benefitsTitle)}</span>
          <ProjectBenefits data={benefitsData} />
        </div>
        <div className="project__text">
          <div className="project__description">
            <span className="description-title">{intl.formatMessage(descriptionTitle)}</span>
            <span className="description-text">{intl.formatMessage(descriptionText)}</span>
          </div>
          <div className="project__files">
            <span className="files-title">{intl.formatMessage(documentationTitle)}</span>
            <div className="files-list">
              {files.map((item, index) => (
                <div className="file-item">
                  {index + 1}. {item.name}
                  <span className={`file-visibility ${item.public ? 'file-public' : ''}`}>
                    {item.public ? intl.formatMessage(publicField) : intl.formatMessage(privateField)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="project__location">
          <span className="location-title">
            {intl.formatMessage(locationTitle)}: {location}
          </span>
          <div className="location-img">
            <WrapperScaleImg cid={mapCID} />
          </div>
        </div>
        <div className="project__footer">
          <CustomBtn label={intl.formatMessage(edit)} customClass="btn__edit-primary" iconClass="icon-pencil" type="button" handleClick={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
