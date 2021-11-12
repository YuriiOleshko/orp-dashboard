import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import CustomBtn from 'src/generic/CustomBtn';
import circle from 'src/assets/image/circle.png';
import {
  wizardPopupTitle, wizardPopupDesc, wizardPopupBtn,
} from '../WizardForm/LangWizardForm';

const lodingDesc = ['Registering Your Project on OFP', 'Registering Your Project on OFP'];

const PopupSuccess = ({ close, hash }) => {
  const intl = useIntl();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [upload, setUpload] = useState(false);

  const explorerLink = `https://explorer.testnet.near.org/transactions/${hash}`;

  const goToDash = () => {
    close();
    history.push('/');
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');

    const timer1 = setTimeout(() => setCount(count + 1), 4500);
    const timer2 = setTimeout(() => setUpload(true), 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.classList.remove('no-scroll');
    };
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
              Click
              <a href={explorerLink} target="_blank" rel="noreferrer">here</a>
              {' '}
              for more information.
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
