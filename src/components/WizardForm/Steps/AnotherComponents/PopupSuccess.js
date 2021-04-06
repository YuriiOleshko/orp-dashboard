import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import CustomBtn from '../../../CustomBtn';
import {
  wizardPopupTitle, wizardPopupDesc, wizardPopupBtn,
} from '../../LangWizardForm';

const PopupSuccess = ({ close }) => {
  const intl = useIntl();
  const history = useHistory();

  const goToDash = () => {
    close();
    history.push('/');
  };

  return (
    <div className="wizard__popup">
      <div className="wizard__popup-bg" />
      <div className="wizard__popup-wrapper">
        <div className="wizard__popup-logo">
          <i className="icon-galka" />
        </div>
        <div className="wizard__popup-desc">
          <h2>{intl.formatMessage(wizardPopupTitle)}</h2>
          <p>{intl.formatMessage(wizardPopupDesc)}</p>
        </div>

        <div className="wizard__popup-btn">
          <CustomBtn label={intl.formatMessage(wizardPopupBtn)} handleClick={() => goToDash()} customClass="btn__next" />

        </div>
      </div>

    </div>
  );
};

export default PopupSuccess;
