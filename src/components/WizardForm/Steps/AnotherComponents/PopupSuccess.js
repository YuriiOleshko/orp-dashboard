import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import CustomBtn from '../../../CustomBtn';
import circle from '../../../../assets/image/circle.png';
import {
  wizardPopupTitle, wizardPopupDesc, wizardPopupBtn,
} from '../../LangWizardForm';

const lodingDesc = ['Minting your project NFT', 'Saving your project data to blockchain'];

const PopupSuccess = ({ close }) => {
  const intl = useIntl();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [upload, setUpload] = useState(false);
  const goToDash = () => {
    close();
    history.push('/');
  };
  useEffect(() => {
    setTimeout(() => setCount(count + 1), 4500);
    setTimeout(() => setUpload(true), 10000);
  }, []);
  return (
    <div className="wizard__popup">
      <div className="wizard__popup-bg" />
      {upload ? (
        <div className="wizard__popup-wrapper">
          <div className="wizard__popup-logo">
            <i className="icon-galka" />
          </div>
          <div className="wizard__popup-desc">
            <h2>{intl.formatMessage(wizardPopupTitle)}</h2>
            <p className="first">{intl.formatMessage(wizardPopupDesc)}</p>
            <p className="second">
              Your Project NFT:
              <a href="https://explorer.testnet.near.org/transactions/iyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgGL" target="_blank" rel="noreferrer">Here</a>
            </p>
          </div>
          <div className="wizard__popup-btn">
            <CustomBtn label={intl.formatMessage(wizardPopupBtn)} handleClick={() => goToDash()} customClass="btn__next" />
          </div>
        </div>
      )
        : (
          <div className="wizard__loader">
            <div className="wizard__loader-circle">
              <img src={circle} alt="img" />
            </div>
            <div className="wizard__loader-sent">
              <span>{lodingDesc[count]}</span>
              <div className="sk-three-bounce">
                <div className="sk-bounce-1 sk-child" />
                <div className="sk-bounce-2 sk-child" />
                <div className="sk-bounce-3 sk-child" />
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default PopupSuccess;
