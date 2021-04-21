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
} from './LangLogin';
import { initIPFS } from '../../state/ipfs';

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
            { intl.formatMessage(title)}
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
