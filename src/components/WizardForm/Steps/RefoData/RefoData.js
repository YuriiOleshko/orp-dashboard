import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import {
  // eslint-disable-next-line no-unused-vars
  wizardBtnBack, wizardBtnNext, step3Input1, step3Input2, step3Input3, step3Input4, step3Ben, step3Input5, step3Area, step3AreaPlace, step3Option1, step3Option2, step3Option3, step3TooltipText,
} from '../../LangWizardForm';
import CustomBtn from '../../../CustomBtn';
import CustomInput from '../../../CustomInput';
import DropzoneInput from '../AnotherComponents/DropzoneInput';
import Benefits from '../AnotherComponents/Benefits';
import CustomSelect from '../../../CustomSelect';

const RefoData = ({ step, nextPage, prevPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  const [files, setFiles] = useState([]);
  const [avgTrees, setAvgTrees] = useState({ avgTrees: state.avgTrees || '' });
  // eslint-disable-next-line no-unused-vars
  const [additional, setAdditional] = useState({});
  const [benefits, setBenefits] = useState({});

  const intl = useIntl();
  const options = [{ label: intl.formatMessage(step3Option1), value: intl.formatMessage(step3Option1) }, { label: intl.formatMessage(step3Option2), value: intl.formatMessage(step3Option2) }, { label: intl.formatMessage(step3Option3), value: intl.formatMessage(step3Option3) }];
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    console.log(data, 'data');
    setState({ ...state, ...data, ...additional, ...benefits, ...files, ...avgTrees });
    nextPage();
  };

  const changeAvgTrees = (ev) => {
    console.log(state.square / (+ev.target.value));
    if (ev.target.value) setAvgTrees({ avgTrees: state.square / (+ev.target.value) });
    else setAvgTrees({ avgTrees: '' });
  };

  if (step !== 2) {
    return null;
  }
  return (
    <div className="wizard__wrapper-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wizard__coord">
          <span className="input__label">{intl.formatMessage(step3Input1)}</span>
          <p className="wizard__code-plus">
            {state.square}
          </p>
        </div>
        <CustomInput
          type="number"
          label={intl.formatMessage(step3Input2)}
          placeholder={intl.formatMessage(step3Input2)}
          required
          change={changeAvgTrees}
          register={register({ required: 'This is required' })}
          error={errors.amountTrees}
          value={state.amountTrees}
          name="amountTrees"
        />
        <div className="wizard__coord">
          <span className="input__label">{intl.formatMessage(step3Input3)}</span>
          <p className="wizard__code-plus">
            {avgTrees.avgTrees}
          </p>
        </div>
        <CustomSelect
          label={intl.formatMessage(step3Input4)}
          register={register({ required: 'This is required' })}
          value={state.typeTrees}
          error={errors.typeTrees}
          name="typeTrees"
          optionArray={options}
        />
        <div className="wizard__benefits">
          <span className="input__label">{intl.formatMessage(step3Ben)}</span>
          <Benefits save={setBenefits} />

        </div>
        <div className="wizard__icon-file">
          <span className="input__label">{intl.formatMessage(step3Input5)}</span>
          <DropzoneInput classCutom="" change={setFiles} multi amountFiles={10} />
        </div>
        <div className="wizard__textarea">
          <label className="input__label ">{intl.formatMessage(step3Area)}</label>
          <textarea name="GenInfo" placeholder={intl.formatMessage(step3AreaPlace)} onChange={(ev) => setAdditional({ additional: ev.target.value })} />
          <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip">
            ?
          </div>
          <ReactTooltip className="wizard__tooltip" place="top" width={300} type="dark" id="step4-tooltip" effect="float">
            {intl.formatMessage(step3TooltipText)}
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
