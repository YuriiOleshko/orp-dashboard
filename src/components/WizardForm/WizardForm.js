import React, { useState } from 'react';
import { useIntl } from 'react-intl';
// import StepWizard from './Steps';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';
import CustomBtn from '../CustomBtn';
import { btnLabel, title } from './LangWizardForm';
import GenInformation from './Steps/GenInformation';
import ProjectLocation from './Steps/ProjectLocation';
import StepWizard from './Steps';
import logo from '../../assets/image/ORPLogo.svg';
import RefoData from './Steps/RefoData';
import ProjectInit from './Steps/ProjectInit';

const WizardForm = () => {
  const intl = useIntl();
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [defaultState, setDefaultState] = useState({});
  const nextPage = () => {
    setStep(step + 1);
  };
  const prevPage = () => {
    setStep(step - 1);
  };
  console.log(defaultState, 'app');
  return (
    <>
      <section className="wizard">
        <div className="wizard__wrapper">
          <div className="wizard__intro">
            <div className="wizard__logo">
              <ReactSVG src={logo} />
            </div>
            <h2 className="wizard__title">
              {intl.formatMessage(title)}
            </h2>
            <div className="wizard__wrapper-btn">
              <CustomBtn label={intl.formatMessage(btnLabel)} customClass="btn__cancel" handleClick={() => { history.push('start-project'); }} iconClass="icon-close" />
            </div>
          </div>
          <StepWizard step={step} />
          <div className="">
            <GenInformation step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} />
            <ProjectLocation step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} prevPage={prevPage} />
            <RefoData step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} prevPage={prevPage} />
            <ProjectInit step={step} state={defaultState} setState={setDefaultState} />
          </div>
        </div>
      </section>

    </>
  );
};

export default WizardForm;
