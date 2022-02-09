/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// eslint-disable-next-line no-unused-vars
import { Controller, useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars

import { useIntl } from 'react-intl';
import bubble from 'src/assets/image/wizard/buble.svg';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import {
  step1Input1, step1Input1Place, step1Input2, step1Input2Place,
  step1Input0,
  step1Input3, step1Input4, step1Input4Place, step1Input6,
  step1Input7, step1Creator, wizardBtnNext,
} from '../../LangWizardForm';
import IconCropper from './IconCropper';
import CustomInput from '../../../../generic/CustomInput';
import FunderInfo from '../../../FunderInfo/FunderInfo';
import CustomBtn from '../../../../generic/CustomBtn';
import DropzoneInput from '../../../Dropzone/DropzoneInput';
import CustomSelect from '../../../../generic/CustomSelect';

const options = [{ label: 'Afforestation & reforestation', value: 'Afforestation & reforestation' }, { label: 'Conservation', value: 'Conservation' }, { label: 'Improved forest management', value: 'Improved forest management' }];
const GenInformation = ({ step, nextPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  const { handleSubmit, errors, register, control } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [countStep, setCountStep] = useState(0);
  const [details, setDetails] = useState({ details: state.details || '' });
  const [fileIcon, setFileIcon] = useState({});
  const [inputsArray, setInputArray] = useState([{ name: '', desc: '', part: '' }]);
  const [myFiles, setMyFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState('');
  const [inputElement, setInputElement] = useState();
  const [isActiveWarning, setIsActiveWarning] = useState(false);
  const [dateWarning, setDateWarning] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [resolutionWarning, setResolutionWarning] = useState('');
  const [openCropper, setOpenCropper] = useState(false);
  const [detailIcon, setDetailIcon] = useState({});
  const [detailIconFile, setDetailIconFile] = useState([]);
  const [previewDetailImg, setPreviewDetailImg] = useState('');
  const [iconType, setIconType] = useState('');

  // const twoYears = new Date(1972, 0, 0, 0, 0, 0, 0) - new Date(1970, 0, 0, 0, 0, 0, 0);
  const threeDays = new Date(1970, 0, 3, 0, 0, 0, 0) - new Date(1970, 0, 0, 0, 0, 0, 0);
  const thrirtyDays = new Date(1970, 0, 30, 0, 0, 0, 0) - new Date(1970, 0, 0, 0, 0, 0, 0);

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

    if (typeInput) {
      // here ev is object: {formattedValue, value, floatValue} ==> follow NumberFormat doc
      if ((+ev.value) >= 100) {
        updArray[count][type] = 100;
        inputElement.value = '100';
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
    const copyData = { ...data };
    const { budget = '2000', funders = [] } = copyData;
    const updBudjet = budget.replace(/(\$|,|\.00)/g, '');
    const updFunders = funders.filter((item) => (Object.values(item).some((el) => el))).map((item) => ({ ...item, part: +((`${item.part}`).replace(/\D/g, '')) }));
    const updData = { ...copyData, budget: updBudjet, funders: updFunders };
    const fromDate = {
      startTimeProject: Date.parse(startDate),
    };
    const toDate = {
      finishTimeProject: Date.parse(endDate),
    };
    const projectDuration = toDate.finishTimeProject - fromDate.startTimeProject;
    if (projectDuration >= threeDays && projectDuration <= thrirtyDays) {
      setDateWarning(false);
      setState({ ...state, ...updData, ...fromDate, ...toDate, ...details, ...fileIcon, ...detailIcon });
      nextPage();
    } else {
      setDateWarning(true);
    }
  };

  if (step !== 0) {
    return null;
  }
  return (
    <div className="wizard__wrapper-form">
      {iconType === 'iconCidDir' && myFiles[0] && openCropper && <IconCropper imageFile={myFiles[0]} change={setFileIcon} setOpenCropper={setOpenCropper} setPreviewImg={setPreviewImg} iconType={iconType} />}
      {iconType === 'iconDetailCidDir' && detailIconFile[0] && openCropper && <IconCropper imageFile={detailIconFile[0]} change={setDetailIcon} setOpenCropper={setOpenCropper} setPreviewImg={setPreviewDetailImg} iconType={iconType} />}
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
            change={() => { }}
            error={errors.name}
            value={state.name}
            name="name"
          />
        </div>
        <div className="wizard__duration">
          <label className="input__label required">{intl.formatMessage(step1Input3)}</label>
          <div className="wizard__tooltip-point wizard__tooltip-point-left" data-tip data-for="project-duration">
            <ReactSVG src={bubble} />
          </div>
          <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="project-duration" effect="float">
            For testing purposes, project duration can be 3-30 days.
          </ReactTooltip>
          <div className="wizard__wrapper-input">
            <DatePicker
              selected={startDate}
              minDate={new Date()}
              onChange={(date) => {
                setStartDate(date);
                if (endDate) {
                  const start = Date.parse(date);
                  const end = Date.parse(endDate);
                  const projectDuration = end - start;
                  if (projectDuration >= threeDays && projectDuration <= thrirtyDays) {
                    setDateWarning(false);
                  } else {
                    setDateWarning(true);
                  }
                }
              }}
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
              onChange={(date) => {
                setEndDate(date);
                if (startDate) {
                  const start = Date.parse(startDate);
                  const end = Date.parse(date);
                  const projectDuration = end - start;
                  if (projectDuration >= threeDays && projectDuration <= thrirtyDays) {
                    setDateWarning(false);
                  } else {
                    setDateWarning(true);
                  }
                }
              }}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="date-picker"
            />
            {dateWarning && (
              <div className="wizard__date-warning">
                {/* <span className="wizard__date-warning-text">Project duration must be at least 2 years.</span> */}
                <span className="wizard__date-warning-text">Project duration must be 3-30 days.</span>
              </div>
            )}
          </div>
        </div>
        {/* <CustomInput
          control={control}
          rules={{ required: true }}
          label={intl.formatMessage(step1Input4)}
          placeholder={intl.formatMessage(step1Input4Place)}
          required
          error={errors.budget}
          // value={state.budget}
          value={2000}
          name="budget"
          usdMask
          prefix="$"
          // decimal
        /> */}
        {/* <div className="wizard__funders-wrapper">
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
              disableBtn={setIsDisabledBtn}
            />
          ))}
          {isActiveWarning && (
            <div className="wizard__funder-warning">
              <span className="wizard__funder-warning-text">Total sum of percents is more than 100%, please enter correct values.</span>
            </div>
          )}
        </div> */}
        <div className="wizard__textarea">
          <label className="input__label ">{intl.formatMessage(step1Input7)}</label>
          <div className="wizard__tooltip-point wizard__tooltip-point-left" data-tip data-for="project-description">
            <ReactSVG src={bubble} />
          </div>
          <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="project-description" effect="float">
            This is a place for you to share with the larger OFP Ecosystem what your forest project is all about. Feel free to include contact information, specifications about the duration and goals of the project, and any other relevant information you think a funder or validator might need to know.
          </ReactTooltip>
          <textarea name="GenInfo" placeholder={intl.formatMessage(step1Input2Place)} onChange={(ev) => setDetails({ details: ev.target.value })} defaultValue={details.details} />
        </div>
        <div className="wizard__icon-file noscroll">
          <span className="input__label">{intl.formatMessage(step1Input6)}</span>
          <DropzoneInput classCutom="" change={setFileIcon} state={state} myFiles={myFiles} setMyFiles={setMyFiles} previewImg={previewImg} setPreviewImg={setPreviewImg} setResolutionWarning={setResolutionWarning} iconType="iconCidDir" setIconType={setIconType} openCropper={openCropper} setOpenCropper={setOpenCropper} />
          {resolutionWarning && <span className="wizard__icon-file-warning">{resolutionWarning}</span>}
        </div>
        <div className="wizard__icon-detail noscroll">
          <span className="input__label">Project Detail Photo</span>
          <DropzoneInput classCustom="dropzone__icon-detail" change={setDetailIcon} state={state} myFiles={detailIconFile} setMyFiles={setDetailIconFile} previewImg={previewDetailImg} setPreviewImg={setPreviewDetailImg} setResolutionWarning={setResolutionWarning} iconType="iconDetailCidDir" setIconType={setIconType} openCropper={openCropper} setOpenCropper={setOpenCropper} />
          {resolutionWarning && <span className="wizard__icon-file-warning">{resolutionWarning}</span>}
        </div>
        <div className="wizard__wrapper-btn-next">
          <CustomBtn disabled={isDisabledBtn} label={intl.formatMessage(wizardBtnNext)} type="submit" handleClick={() => { }} customClass={`btn__next ${isDisabledBtn ? 'btn__next-disabled' : ''}`} />
        </div>
      </form>
    </div>
  );
};

export default GenInformation;
