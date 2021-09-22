import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { ReactSVG } from 'react-svg';
import NumberFormat from 'react-number-format';
import CustomBtn from 'src/generic/CustomBtn';
import CustomInput from 'src/generic/CustomInput';
import DropzoneInput from 'src/components/Dropzone';
import Benefits from 'src/components/Benefits';

import bubble from 'src/assets/image/wizard/buble.svg';
import {
  wizardBtnBack, wizardBtnNext, step3Input1, step3Input2, step3Input3, step3Ben, step3Input5, step3Area, step3AreaPlace, step3TooltipTextArea, step3TooltipFiles,
} from '../../LangWizardForm';

const RefoData = ({ step, nextPage, prevPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  // const privateArray = state.privateFiles || [];
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors, control } = useForm();
  const [files, setFiles] = useState({});
  const [avgTrees, setAvgTrees] = useState({ avgTrees: state.avgTrees || '' });
  // eslint-disable-next-line no-unused-vars
  const [additional, setAdditional] = useState({});
  const [benefits, setBenefits] = useState({});
  const [filesSave, setFilesSave] = useState([]);
  const [myFiles, setMyFiles] = useState([]);

  const intl = useIntl();
  // const options = [{ label: intl.formatMessage(step3Option1), value: intl.formatMessage(step3Option1) }, { label: intl.formatMessage(step3Option2), value: intl.formatMessage(step3Option2) }, { label: intl.formatMessage(step3Option3), value: intl.formatMessage(step3Option3) }];
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    const copyData = { ...data };
    const updAmountTrees = copyData.amountTrees.replace(/\D/g, '');
    const updData = { ...copyData, amountTrees: updAmountTrees };
    const privateFiles = { privateFiles: filesSave };
    setState({ ...state, ...updData, ...additional, ...benefits, ...files, ...avgTrees, ...privateFiles });
    nextPage();
  };
  const changeAvgTrees = (ev) => {
    // here ev is object: {formattedValue, value, floatValue} ==> follow NumberFormat doc
    if (ev.value) setAvgTrees({ avgTrees: Math.floor((+ev.value) / state.square) });
    else setAvgTrees({ avgTrees: '' });
  };

  if (step !== 2) {
    return null;
  }

  return (
    <div className="wizard__wrapper-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wizard__step3-wrapper">
          <div className="wizard__coord">
            <span className="input__label">{intl.formatMessage(step3Input1)}</span>
            <p className="wizard__code-plus">
              <NumberFormat value={state.square} displayType="text" thousandSeparator />
            </p>
          </div>
          <CustomInput
            control={control}
            rules={{ required: true }}
            label={intl.formatMessage(step3Input2)}
            placeholder={intl.formatMessage(step3Input2)}
            required
            change={changeAvgTrees}
            error={errors.amountTrees}
            value={state.amountTrees}
            name="amountTrees"
            usdMask
          />
          <div className="wizard__coord">
            <span className="input__label">{intl.formatMessage(step3Input3)}</span>
            <p className="wizard__code-plus">
              <NumberFormat value={avgTrees.avgTrees} displayType="text" thousandSeparator />
            </p>
          </div>
        </div>
        <div className="wizard__benefits">
          <span className="input__label">{intl.formatMessage(step3Ben)}</span>
          <Benefits save={setBenefits} state={state} />

        </div>
        <div className="wizard__icon-file">
          <div className="wizard__wrapper-tooltip">
            {' '}
            <div className="wizard__tooltip-point" data-tip data-for="step3-tooltip-files">
              <ReactSVG src={bubble} />
            </div>
            <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step3-tooltip-files" effect="float">
              {intl.formatMessage(step3TooltipFiles)}
            </ReactTooltip>
            <span className="input__label">{intl.formatMessage(step3Input5)}</span>
          </div>

          <DropzoneInput classCutom="" change={setFiles} multi amountFiles={10} state={state} filesSave={filesSave} setFilesSave={setFilesSave} myFiles={myFiles} setMyFiles={setMyFiles} />
        </div>
        <div className="wizard__textarea">
          <label className="input__label ">{intl.formatMessage(step3Area)}</label>
          <textarea name="GenInfo" placeholder={intl.formatMessage(step3AreaPlace)} onChange={(ev) => setAdditional({ additional: ev.target.value })} />
          <div className="wizard__tooltip-point refo" data-tip data-for="step3-tooltip-area">
            <ReactSVG src={bubble} />
          </div>
          <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step3-tooltip-area" effect="float">
            {intl.formatMessage(step3TooltipTextArea)}
          </ReactTooltip>

        </div>
        <div className="wizard__wrapper-panel">
          <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => prevPage()} type="button" customClass="btn__cancel" />
          <CustomBtn label={intl.formatMessage(wizardBtnNext)} handleClick={() => {}} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default RefoData;
