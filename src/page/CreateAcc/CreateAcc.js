/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedDate, useIntl } from 'react-intl';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { appStore } from 'src/state/app';
import IntroPage from 'src/components/IntroPage';
import CustomBtn from 'src/generic/CustomBtn';
import CustomInput from 'src/generic/CustomInput';
import {
  getContract,
  contractMethods,
} from 'src/utils/near-utils';
import { GAS, parseNearAmount } from 'src/state/near';
import { copyRight } from '../Login/LangLogin';

import {
  title,
  inputPlaceholderName,
  inputPlaceholderLast,
  inputPlaceholderCompany,
  inputPlaceholderEmail,
  btnLabel, inputPlaceholderTerms,
} from './LangCreateAcc';

const CreateAcc = () => {
  const history = useHistory();
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { wallet, account, app } = state;
  const { profile } = app;
  const { register, handleSubmit, errors } = useForm();

  // useEffect(() => {
  //   const funcBack = (e) => {
  //     localStorage.clear();
  //   };
  //   window.addEventListener('beforeunload', funcBack);
  //   return () => window.removeEventListener('beforeunload', funcBack);
  // }, []);

  const onSubmit = async (data) => {
    update('loading', true);
    const deposit = parseNearAmount('1');
    const contract = getContract(account, contractMethods, 0);
    const test = await contract.add_profile(
      {
        account_id: account.accountId,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        organization: data.companyName,
        terms: data.terms,
      },
      GAS,
      deposit,
    );
    update('loading', false);
    history.push('/start-project');
  };

  if (profile && Object.keys(profile).length) {
    return <Redirect to="/start-project" />;
  }

  return (
    <section className="login">
      <div className="login__wrapper container">
        <IntroPage />
        {!state.loading ? (
          <div className="login__entry">
            <div className="login__form">
              <h2 className="login__form-title">
                {intl.formatMessage(title)}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput type="text" label={intl.formatMessage(inputPlaceholderCompany)} name="companyName" register={register({ maxLength: 180 })} />
                <CustomInput
                  type="text"
                  error={errors.firstName}
                  name="firstName"
                  label={intl.formatMessage(inputPlaceholderName)}
                  register={register({
                    required: true,
                    maxLength: 80,
                  })}
                />
                <CustomInput
                  type="text"
                  error={errors.lastName}
                  label={intl.formatMessage(inputPlaceholderLast)}
                  name="lastName"
                  register={register({
                    required: true,
                    maxLength: 100,
                  })}
                />
                <CustomInput
                  type="text"
                  label={intl.formatMessage(inputPlaceholderEmail)}
                  error={errors.email}
                  name="email"
                  register={register({
                    required: true,
                    maxLength: 180,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <CustomInput
                  type="checkbox"
                  label={(
                    <span>
                      By continuing, you agree to OFP
                      {' '}
                      <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">Terms of Use</Link>
                      {' '}
                      and
                      {' '}
                      <Link to="/private_notice" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                      .
                    </span>
)}
                  error={errors.terms}
                  name="terms"
                  value={false}
                  customClassLabel="login__check-label"
                  customClass="login__checkbox"
                  register={register({
                    required: true,
                  })}
                />
                <div className="login__wrapper-btn_acc">
                  <CustomBtn
                    label={intl.formatMessage(btnLabel)}
                    customClass="btn__acc"
                    iconClass=""
                    type="submit"
                    handleClick={() => {
                    }}
                    idLang="login.button"
                  />
                  {/* <Link to="start-project" className="login__anchor">
                    {intl.formatMessage(btnLateLabel)}
                  </Link> */}
                </div>
              </form>
            </div>
            <p className="login__copy">
              {intl.formatMessage(copyRight)}
              <FormattedDate
                value={Date.now()}
                year="numeric"
              />
            </p>
          </div>
        ) : (
          <p className="login__loading">
            <i className="icon-shield" />
            Setting up your account...
          </p>
        )}
      </div>
    </section>
  );
};

export default CreateAcc;
