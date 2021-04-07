import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  // eslint-disable-next-line no-unused-vars
  wizardBtnBack, wizardBtnNext, step3Input1, step3Input2, step3Input3, step3Input3Place, step3Input4, step3Input4Place, step3Ben, step3Input5, step3Area, step3AreaPlace, step2CodePlus, step1Input1, step1Input1Place, step1Input6, step1Input7,
} from '../../LangWizardForm';
import CustomBtn from '../../../CustomBtn';
import CustomInput from '../../../CustomInput';
import DropzoneInput from '../AnotherComponents/DropzoneInput';
import Benefits from '../AnotherComponents/Benefits';

const RefoData = ({ step, nextPage, prevPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [files, setFiles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [additional, setAdditional] = useState({});
  const [benefits, setBenefits] = useState({});

  const intl = useIntl();
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    setState({ ...state, ...data, ...additional, ...benefits, ...files });
    nextPage();
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
          type="text"
          label={intl.formatMessage(step3Input2)}
          placeholder={intl.formatMessage(step3Input2)}
          required
          register={register({ required: 'This is required' })}
          error={errors.amountTrees}
          value={state.amountTrees}
          name="amountTrees"
        />
        <CustomInput
          type="text"
          label={intl.formatMessage(step3Input3)}
          placeholder={intl.formatMessage(step3Input3Place)}
          required
          error={errors.avg}
          register={register({ required: 'This is required' })}
          value={state.avg}
          name="avg"
        />
        <CustomInput
          type="text"
          label={intl.formatMessage(step3Input4)}
          placeholder={intl.formatMessage(step3Input4Place)}
          required
          error={errors.species}
          register={register({ required: 'This is required' })}
          value={state.species}
          name="species"
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
