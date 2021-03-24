import React from 'react';
import { Router, useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import StepRoutes from './Steps';
import CustomBtn from '../CustomBtn';
import { btnLabel, title } from './LangWizardForm';

const WizardForm = () => {
  const intl = useIntl();
  const history = useHistory();
  return (
    <>
      <section className="wizard">
        <div className="wizard__wrapper">
          <div className="wizard__intro">
            <h2 className="wizard__title">
              {intl.formatMessage(title)}
            </h2>
            <div className="wizard__wrapper">
              <CustomBtn label={intl.formatMessage(btnLabel)} customClass="btn__cancel" handleClick={() => {}} iconClass="icone-close" />
            </div>
          </div>

          <Router history={history}>
            <StepRoutes />
          </Router>
        </div>
      </section>

    </>
  );
};

export default WizardForm;
