/* eslint-disable no-unused-vars */
import React from 'react';
import { useIntl } from 'react-intl';

const StepWizard = ({ step, stepForm }) => {
  const intl = useIntl();
  return (
    <>
      <div className="wizard__steps">
        {stepForm.map((item, index) => {
          const customClass = `wizard__step ${step === index ? 'active' : ''}`;
          const completeClass = `icon-galka ${step > index ? 'active' : ''}`;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className={customClass} key={item + index}>
              <i className={completeClass} />
              {index + 1}
              .
              {' '}
              {intl.formatMessage(item)}
            </div>
          );
        })}

      </div>
    </>
  );
};

export default StepWizard;
