/* eslint-disable no-unused-vars */
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
  wizardBtnBack, wizardBtnNext, step3Input1, step3Input2, step3Input3, step3Ben, step3Input5, step3Area, step3AreaPlace, step3TooltipTextArea, step3TooltipFiles, step4Preview, ste4Create,
} from '../../LangWizardForm';

const RefoData = ({ step, nextPage, prevPage, state, setState, setShowPreview, handleMint }) => {
  // eslint-disable-next-line no-unused-vars
  // const privateArray = state.privateFiles || [];
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors, control } = useForm();
  const [files, setFiles] = useState({});
  const [avgTrees, setAvgTrees] = useState({ avgTrees: state.avgTrees || '' });
  // eslint-disable-next-line no-unused-vars
  const [additional, setAdditional] = useState({ additional: state.additional || '' });
  const [amountTrees, setAmountTrees] = useState({ amountTrees: state.amountTrees || '' });
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
    handleMint({ ...state, ...updData, ...additional, ...benefits, ...files, ...avgTrees, ...privateFiles });
  };
  const changeAmountTrees = (ev) => {
    setAmountTrees({ amountTrees: ev.value });
  };
  const changeAvgTrees = (ev) => {
    if (ev.value) setAvgTrees({ avgTrees: Math.floor((+ev.value)) });
    else setAvgTrees({ avgTrees: '' });
  };
  const goToPreview = (data) => {
    const copyData = { ...data };
    const updAmountTrees = copyData.amountTrees.replace(/\D/g, '');
    const updData = { ...copyData, amountTrees: updAmountTrees };
    const privateFiles = { privateFiles: filesSave };
    setState({ ...state, ...updData, ...additional, ...benefits, ...files, ...avgTrees, ...privateFiles });
    setShowPreview(true);
    nextPage();
  };

  if (step !== 2) {
    return null;
  }

  return (
    <div className="wizard__wrapper-form">
      <form>
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
            change={changeAmountTrees}
            error={errors.amountTrees}
            value={state.amountTrees || amountTrees.amountTrees}
            name="amountTrees"
            usdMask
          />
          <CustomInput
            control={control}
            rules={{ required: false }}
            label="Approx. tree density (trees/ha)"
            placeholder="Approx. tree density (trees/ha)"
            change={changeAvgTrees}
            error={errors.avgTrees}
            value={state.avgTrees || avgTrees.avgTrees}
            name="avgTrees"
            usdMask
          />
          {/* <NumberFormat value={avgTrees.avgTrees} displayType="text" thousandSeparator /> */}
        </div>
        {/* <div className="wizard__benefits">
          <span className="input__label">{intl.formatMessage(step3Ben)}</span>
          <Benefits save={setBenefits} state={state} />

        </div> */}
        <div className="wizard__icon-file wizard__icon-file-big noscroll">
          <div className="wizard__wrapper-tooltip wizard__wrapper-tooltip-fixed">
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
        {/* <div className="wizard__textarea">
          <label className="input__label ">{intl.formatMessage(step3Area)}</label>
          <textarea name="GenInfo" placeholder={intl.formatMessage(step3AreaPlace)} onChange={(ev) => setAdditional({ additional: ev.target.value })} defaultValue={additional.additional} />
          <div className="wizard__tooltip-point refo" data-tip data-for="step3-tooltip-area">
            <ReactSVG src={bubble} />
          </div>
          <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step3-tooltip-area" effect="float">
            {intl.formatMessage(step3TooltipTextArea)}
          </ReactTooltip>

        </div> */}
        {/* <div className="wizard__wrapper-panel">
          <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => prevPage()} type="button" customClass="btn__cancel" />
          <CustomBtn label={intl.formatMessage(wizardBtnNext)} handleClick={() => {}} type="submit" />
        </div> */}
        <div className="wizard__btn-init">
          <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => prevPage()} type="button" customClass="btn__cancel" />
          <CustomBtn label={intl.formatMessage(step4Preview)} handleClick={handleSubmit((data) => goToPreview(data))} type="button" customClass="btn__cancel" />
          <CustomBtn label={intl.formatMessage(ste4Create)} type="submit" handleClick={handleSubmit(onSubmit)} customClass="btn__next" />
        </div>
      </form>
    </div>
  );
};

export default RefoData;
