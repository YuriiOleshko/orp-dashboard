import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  step4TitleCoast, step4TitleTime, step4Coast1, step4Coast2, step4Coast3, step4Coast4, step4PointDai, step4PointSlope, ste4Phase, ste4Month, ste4Create,
} from '../../LangWizardForm';
import Chart from '../AnotherComponents/Chart';
import CustomBtn from '../../../CustomBtn';
import PopupSuccess from '../AnotherComponents/PopupSuccess';

const ProjectInit = ({ step }) => {
  const intl = useIntl();

  const dataChart = [
    {
      name: `${intl.formatMessage(ste4Phase)} 1 (3 ${intl.formatMessage(ste4Month)})`,
      'data upload fee slope in (%)': 50,
      'data upload fee,dai': 150,
      cnt: 490,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 2 (3 ${intl.formatMessage(ste4Month)})`,
      'data upload fee slope in (%)': 40,
      'data upload fee,dai': 125,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 3 (6 ${intl.formatMessage(ste4Month)})`,
      'data upload fee slope in (%)': 30,
      'data upload fee,dai': 100,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (12 ${intl.formatMessage(ste4Month)})`,
      'data upload fee slope in (%)': 20,
      'data upload fee,dai': 75,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (13 ${intl.formatMessage(ste4Month)})`,
      'data upload fee slope in (%)': 10,
      'data upload fee,dai': 50,
    },
  ];

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    document.body.classList.toggle('no-scroll');
  };
  if (step !== 3) {
    return null;
  }
  return (
    <div className="wizard__wrapper-form">
      {showPopup && <PopupSuccess close={togglePopup} />}
      <div className="wizard__cost">
        <h3 className="wizard__cost-title">{intl.formatMessage(step4TitleCoast)}</h3>
        <div className="wizard__cost-list">
          <p className="wizard__cost-item">
            <span>{intl.formatMessage(step4Coast1)}</span>
            <span className="bold">50 DAI</span>
          </p>
          <p className="wizard__cost-item">
            <span>{intl.formatMessage(step4Coast2)}</span>
            <span className="bold">50 DAI</span>
          </p>
          <p className="wizard__cost-item">
            <span>{intl.formatMessage(step4Coast3)}</span>
            <span className="bold">150 DAI</span>
          </p>
          <p className="wizard__cost-item">
            <span>{intl.formatMessage(step4Coast4)}</span>
            <span className="bold">1500 DAI</span>
          </p>
        </div>
      </div>
      <div className="wizard__chart">
        <div className="wizard__panel-chart">
          <h3 className="wizard__cost-title">{intl.formatMessage(step4TitleTime)}</h3>
          <div className="wizard__point-words">
            <span className="green">{intl.formatMessage(step4PointDai)}</span>
            <span className="blue">{intl.formatMessage(step4PointSlope)}</span>
          </div>
        </div>
        <div className="wizard__wrapper-chart">
          <Chart data={dataChart} />
        </div>
      </div>
      <div className="wizard__wrapper-btn-next">
        <CustomBtn label={intl.formatMessage(ste4Create)} type="submit" handleClick={() => { togglePopup(); }} customClass="btn__next" />
      </div>
    </div>

  );
};

export default ProjectInit;
