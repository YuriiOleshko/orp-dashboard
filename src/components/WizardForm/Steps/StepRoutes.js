import React from 'react';
import { Route } from 'react-router';
import { useIntl } from 'react-intl';
import GenInformation from './GenInformation';
import ProjectLocation from './ProjectLocation';
import RefoData from './RefoData';
import {
  // eslint-disable-next-line import/named
  step1, step2, step3, step4,
} from '../LangWizardForm';

const StepRoutes = () => {
  const intl = useIntl();

  return (
    <>

      <Route exact path="/create-project/info" component={() => <GenInformation />} />
      <Route exact path="/create-project/location" component={() => <ProjectLocation />} />
      <Route exact path="/create-project/data" component={() => <RefoData />} />

      <div className="wizard__steps">
        <div className="wizard__step">
          1.
          {intl.formatMessage(step1)}
        </div>
        <div className="wizard__step">
          2.
          {intl.formatMessage(step2)}
        </div>
        <div className="wizard__step">
          3.
          {intl.formatMessage(step3)}
        </div>
        <div className="wizard__step">
          4.
          {intl.formatMessage(step4)}
        </div>

      </div>
    </>
  );
};

export default StepRoutes;
