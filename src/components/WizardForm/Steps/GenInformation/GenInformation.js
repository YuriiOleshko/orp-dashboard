import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line no-unused-vars
import { Controller, useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars

import { useIntl } from 'react-intl';
import {
  step1Input1, step1Input1Place, step1Input2, step1Input2Place,
  step1Input0,
  step1Input3, step1Input4, step1Input4Place, step1Input6,
  step1Input7, step1Creator, wizardBtnNext,
} from '../../LangWizardForm';
import CustomInput from '../../../CustomInput';
import FunderInfo from '../AnotherComponents/FunderInfo';
import CustomBtn from '../../../CustomBtn';
import DropzoneInput from '../AnotherComponents/DropzoneInput';
import CustomSelect from '../../../CustomSelect';

const options = [{ label: 'Trees', value: 'Trees' }, { label: 'Reserves', value: 'Reserves' }, { label: 'Forest', value: 'Forest' }];
const GenInformation = ({ step, nextPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  const { handleSubmit, errors, register, control } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [countStep, setCountStep] = useState(0);
  const [details, setDetails] = useState({});
  const [fileIcon, setFileIcon] = useState({});
  const [inputsArray, setInputArray] = useState([{ FunderName: '', FunderInfo: '', FunderPart: '' }]);
  const [myFiles, setMyFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState('');
  const [inputElement, setInputElement] = useState();
  const [isActiveWarning, setIsActiveWarning] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  console.log(inputElement);
  console.log(inputsArray);

  const countSumOfParts = (funders) => {
    const parts = funders.map((item) => +Object.values(item)[Object.values(item).length - 1]);
    const sumOfParts = parts.reduce((sum, curr) => sum + curr, 0);
    if (sumOfParts > 100) {
      setIsActiveWarning(true);
      setIsDisabledBtn(true);
    } else {
      setIsActiveWarning(false);
      setIsDisabledBtn(false);
    }
  };

  const handleChange = (ev, type, count, typeInput) => {
    const updArray = inputsArray.slice(0);
    console.log(typeInput, 'typeInput');

    if (typeInput) {
      // here ev is object: {formattedValue, value, floatValue} ==> follow NumberFormat doc
      if ((+ev.value) >= 100) {
        updArray[count][type] = 100;
        inputElement.value = '100%';
      } else {
        updArray[count][type] = ev.value;
      }
      countSumOfParts(updArray);
    } else updArray[count][type] = ev.target.value;

    setInputArray(updArray);
  };

  const createInput = (count) => {
    setCountStep(count);
    const updArray = inputsArray.slice(0);
    updArray.push({ [`FunderName${count}`]: '', [`FunderInfo${count}`]: '', [`FunderPart${count}`]: '' });
    setInputArray(updArray);
  };

  const deleteInput = (count) => {
    setCountStep(count - 1);
    const updArray = inputsArray.slice(0);
    updArray.splice(count, 1);
    setInputArray(updArray);
    countSumOfParts(updArray);
  };

  const [endDate, setEndDate] = useState(new Date());
  const intl = useIntl();
  const onSubmit = (data) => {
    console.log(data);
    const copyData = { ...data };
    const { budjet, funders } = copyData;
    const updBudjet = budjet.replace(/(\$|,|\.00)/g, '');
    console.log(funders, 'funders');
    const updFunders = funders.map((item) => ({ ...item, part: (`${item.part}`).replace(/\D/g, '') }));
    const updData = { ...copyData, budjet: updBudjet, funders: updFunders };
    const fromDate = {
      startTimeProject: Date.parse(startDate),
    };
    const toDate = {
      finishTimeProject: Date.parse(endDate),
    };
    setState({ ...state, ...updData, ...fromDate, ...toDate, ...details, ...fileIcon });
    nextPage();
  };

  if (step !== 0) {
    return null;
  }
  return (
    <div className="wizard__wrapper-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wizard__step1-wrapper">
          <CustomInput
            type="text"
            label={intl.formatMessage(step1Input2)}
            placeholder={intl.formatMessage(step1Input2Place)}
            register={register({ required: 'This is required', maxLength: 100 })}
            required
            error={errors.developer}
            value={state.developer}
            name="developer"
          />
          <CustomSelect
            label={intl.formatMessage(step1Input0)}
            register={register({ required: 'This is required' })}
            value={state.type}
            required
            error={errors.type}
            name="type"
            optionArray={options}
          />
          <CustomInput
            type="text"
            label={intl.formatMessage(step1Input1)}
            placeholder={intl.formatMessage(step1Input1Place)}
            register={register({ required: 'This is required', maxLength: 100 })}
            required
            change={() => {}}
            error={errors.name}
            value={state.name}
            name="name"
          />
        </div>
        <div className="wizard__duration">
          <label className="input__label required">{intl.formatMessage(step1Input3)}</label>
          <div className="wizard__wrapper-input">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              startDate={startDate}
              endDate={endDate}
              className="date-picker"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="date-picker"
            />
          </div>
        </div>
        <CustomInput
          control={control}
          rules={{ required: true }}
          label={intl.formatMessage(step1Input4)}
          placeholder={intl.formatMessage(step1Input4Place)}
          required
          error={errors.budjet}
          value={state.budjet}
          name="budjet"
          usdMask
          prefix="$"
          decimal
        />
        <div className="wizard__funders-wrapper">
          <div className="wizard__create" onClick={() => createInput(countStep + 1)}>
            <i className="icon-plus-cir" />
            <span>{intl.formatMessage(step1Creator)}</span>
          </div>
        </div>
        <div className="wizard__funders-data">
          {inputsArray.length > 0 && inputsArray.map((el, index) => (
            <FunderInfo
            // eslint-disable-next-line react/no-array-index-key
              key={`${index}FundersName${index}`}
              inputsArray={inputsArray}
              intl={intl}
              count={index}
              change={handleChange}
              registerInfo={register({ maxLength: 100 })}
              registerName={register({ maxLength: 100 })}
              registerPart={register({ maxLength: 3 })}
              deleteInput={deleteInput}
              control={control}
              setInputElement={setInputElement}
              warning={isActiveWarning}
            />
          ))}
          {isActiveWarning && (
            <div className="wizard__funder-warning">
              <span className="wizard__funder-warning-text">Total sum of percents is more than 100%, please enter correct values.</span>
            </div>
          )}
        </div>
        <div className="wizard__icon-file">
          <span className="input__label">{intl.formatMessage(step1Input6)}</span>
          <DropzoneInput classCutom="" change={setFileIcon} state={state} myFiles={myFiles} setMyFiles={setMyFiles} previewImg={previewImg} setPreviewImg={setPreviewImg} />
        </div>
        <div className="wizard__textarea">
          <label className="input__label ">{intl.formatMessage(step1Input7)}</label>

          <textarea name="GenInfo" placeholder={intl.formatMessage(step1Input2Place)} onChange={(ev) => setDetails({ details: ev.target.value })} />
        </div>
        <div className="wizard__wrapper-btn-next">
          <CustomBtn disabled={isDisabledBtn} label={intl.formatMessage(wizardBtnNext)} type="submit" handleClick={() => {}} customClass={`btn__next ${isDisabledBtn ? 'btn__next-disabled' : ''}`} />
        </div>
      </form>
    </div>
  );
};

export default GenInformation;
