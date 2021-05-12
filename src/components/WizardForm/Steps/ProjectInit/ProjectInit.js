import React from 'react';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { ReactSVG } from 'react-svg';
import NumberFormat from 'react-number-format';
import {
  step4TitleCoast, step4TitleTime, step4Coast1, step4Coast2, step4Coast3, step4Coast4, step4PointDai, step4PointSlope, ste4Phase, ste4Month, ste4Create, step4Tooltip1,
  step4Tooltip2, step4Tooltip3, step4Tooltip4, wizardBtnBack, step4Preview,
} from '../../LangWizardForm';
import Chart from '../AnotherComponents/Chart';
import CustomBtn from '../../../CustomBtn';
import buble from '../../../../assets/image/wizard/buble.svg';

const ProjectInit = ({ step, handleMint, prevPage, nextPage, setShowPreview }) => {
  const intl = useIntl();

  const dataChart = [
    {
      name: `${intl.formatMessage(ste4Phase)} 1 (3 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 50,
      'Data Upload Fee, USD': 150,
      cnt: 490,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 2 (3 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 40,
      'Data Upload Fee, USD': 125,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 3 (6 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 30,
      'Data Upload Fee, USD': 100,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (12 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 20,
      'Data Upload Fee, USD': 75,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (13 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 10,
      'Data Upload Fee, USD': 50,
    },
  ];

  const goToPreview = () => {
    setShowPreview(true);
    nextPage();
  };

  if (step !== 3) {
    return null;
  }
  return (
    <div className="wizard__wrapper-form">
      <div className="wizard__cost">
        <h3 className="wizard__cost-title">{intl.formatMessage(step4TitleCoast)}</h3>
        <div className="wizard__cost-list">
          <div className="wizard__cost-item">
            <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-1">
              <ReactSVG src={buble} />
            </div>
            <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-1" effect="float">
              {intl.formatMessage(step4Tooltip1)}
            </ReactTooltip>
            <span>{intl.formatMessage(step4Coast1)}</span>
            <span className="bold">
              <NumberFormat value="50" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
            </span>
          </div>
          <div className="wizard__cost-item">
            <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-2">
              <ReactSVG src={buble} />
            </div>
            <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-2" effect="float">
              {intl.formatMessage(step4Tooltip2)}
            </ReactTooltip>
            <span>{intl.formatMessage(step4Coast2)}</span>
            <span className="bold">
              <NumberFormat value="150" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
            </span>
          </div>
          <div className="wizard__cost-item">
            <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-3">
              <ReactSVG src={buble} />
            </div>
            <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-3" effect="float">
              {intl.formatMessage(step4Tooltip3)}
            </ReactTooltip>
            <span>{intl.formatMessage(step4Coast3)}</span>
            <span className="bold">
              <NumberFormat value="150" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
            </span>
          </div>
        </div>
      </div>
      <div className="wizard__chart">
        <div className="wizard__panel-chart">
          <h3 className="wizard__cost-title">{intl.formatMessage(step4TitleTime)}</h3>

        </div>
        <div className="wizard__wrapper-chart">
          <Chart data={dataChart} />
          <div className="wizard__point-words">
            <span className="green">{intl.formatMessage(step4PointDai)}</span>
            <span className="blue">{intl.formatMessage(step4PointSlope)}</span>
          </div>
        </div>
      </div>
      <div className="wizard__total-block">
        <div className="wizard__cost-item">
          <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-4">
            <ReactSVG src={buble} />
          </div>
          <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-4" effect="float">
            {intl.formatMessage(step4Tooltip4)}
          </ReactTooltip>
          <span>{intl.formatMessage(step4Coast4)}</span>
          <span className="bold">
            <NumberFormat value="1500" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
          </span>
        </div>
      </div>
      <div className="wizard__btn-init">
        <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => prevPage()} type="button" customClass="btn__cancel" />
        <CustomBtn label={intl.formatMessage(step4Preview)} handleClick={() => goToPreview()} type="button" customClass="btn__cancel" />
        <CustomBtn label={intl.formatMessage(ste4Create)} type="submit" handleClick={handleMint} customClass="btn__next" />
      </div>
    </div>

  );
};

export default ProjectInit;
