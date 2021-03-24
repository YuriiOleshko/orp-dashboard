/* eslint-disable */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedDate, useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { appStore } from '../../state/app';
import IntroPage from '../../components/IntroPage';
import CustomBtn from '../../components/CustomBtn';
import CustomInput from '../../components/CustomInput';
import { copyRight } from '../Login/LangLogin';
import {
  getContract,
  contractMethods,
} from '../../utils/near-utils';

import {
  title,
  inputPlaceholderName,
  inputPlaceholderLast,
  inputPlaceholderCompany,
  inputPlaceholderEmail,
  btnLabel,
  btnLateLabel,
} from './LangCreateAcc';

const CreateAcc = () => {
  const history = useHistory();
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { wallet, account } = state;
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    update('loading', true);
    const contract = getContract(account, contractMethods);
    const test = await contract.insert_data({value: JSON.stringify(data)});
    update('loading', false);
    if (test) {
      update('app', {profile: data});
      history.push('/start-project');
    }
  };



  console.log('Errors', errors);

  return (
    <section className="login">
      <div className="login__wrapper container">
        <IntroPage />
        {!state.loading?<div className="login__entry">
          <div className="login__form">
            <h2 className="login__form-title">
              {intl.formatMessage(title)}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                type="text"
                error={errors.firstName}
                placeholder={intl.formatMessage(inputPlaceholderName)}
                name="firstName"
                label={intl.formatMessage(inputPlaceholderName)}
                register={register({
                  required: true,
                  maxLength: 80
                })}
              />
              <CustomInput type="text"
                           error={errors.lastName}
                           label={intl.formatMessage(inputPlaceholderLast)}
                           placeholder={intl.formatMessage(inputPlaceholderLast)}
                           name="lastName" register={register({
                required: true,
                maxLength: 100
              })}/>
              <CustomInput type="text" label={intl.formatMessage(inputPlaceholderEmail)} placeholder={intl.formatMessage(inputPlaceholderEmail)}
                           error={errors.email}
                           name="email" register={register({
                required: true,
                maxLength: 180,
                pattern: /^\S+@\S+$/i
              })}/>
              <CustomInput type="text" label={intl.formatMessage(inputPlaceholderCompany)} placeholder={intl.formatMessage(inputPlaceholderCompany)} name="companyName" register={register({ maxLength: 180 })}/>
              <div className="login__wrapper-btn_acc">
                <CustomBtn label={intl.formatMessage(btnLabel)}
                           customClass="btn__acc"
                           iconClass=""
                           type="submit"
                           handleClick={() => {
                           }}
                           idLang="login.button"
                />
                <Link to="start-project" className="login__anchor">
                  {intl.formatMessage(btnLateLabel)}
                </Link>
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
        </div>:<p className='login__loading'><i className='icon-shield'/>Sending data to blockchain...</p>}
      </div>
    </section>
  );
};

export default CreateAcc;
