/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { useIntl, FormattedDate } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { appStore } from '../../state/app';
import CustomBtn from '../../components/CustomBtn';
import IntroPage from '../../components/IntroPage';
import {
  title,
  btnLabel,
  copyRight,
  subTitle,
  tooltipText,
} from './LangLogin';
import ReactTooltip from 'react-tooltip';
import { ReactSVG } from 'react-svg';
import buble from '../../assets/image/wizard/buble.svg';

const Login = () => {
  const intl = useIntl();

  const { state } = useContext(appStore);
  const { wallet } = state;

  if (wallet && wallet.signedIn) {
    return <Redirect to="/create-account" />;
  }

  return (
    <section className="login">
      <div className="login__wrapper container">
        <IntroPage />
        <div className="login__entry">
          <h2 className="login__title">
            {intl.formatMessage(title)}
          </h2>
          <div className="login__wrapper-btn">
            <CustomBtn
              label={
                intl.formatMessage(btnLabel)
              }
              customClass="btn__login"
              iconClass="icon-account"
              handleClick={() => wallet.signIn()}
              idLang="login.button"
            />
            <div className="login__subtitle" data-tip data-for="login-tooltip">
              <span>{intl.formatMessage(subTitle)}</span>
              <div className="login__tooltip-point">
                <ReactSVG src={buble} />
              </div>
              <ReactTooltip className="login__tooltip" place="bottom" width={320} type="light" id="login-tooltip" effect="float">
                {intl.formatMessage(tooltipText)}
              </ReactTooltip>
            </div>
          </div>
          <p className="login__copy">
            {intl.formatMessage(copyRight)}
            <FormattedDate
              value={Date.now()}
              year="numeric"
            />
          </p>
        </div>

      </div>
    </section>

  );
};

export default Login;
