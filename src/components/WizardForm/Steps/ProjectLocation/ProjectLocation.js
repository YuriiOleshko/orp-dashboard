import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  step2Input1, step2Input1Place1, step2Input1Place2, step2Input2, step2CodePlus, step2BtnLabel, wizardBtnNext, wizardBtnBack,
} from '../../LangWizardForm';
import CustomInput from '../../../CustomInput';
import CustomBtn from '../../../CustomBtn';
import Map from '../../../Map';

const ProjectLocation = ({ step, nextPage, prevPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [showMap, setShowMap] = useState(false);
  const [coordinate, setCoordinate] = useState({
    region: '',
    polygon: [],
    codePlus: null,
    polygonCoordinate: [],
    square: 0,
    coordinate: { longitude: '', latitude: '' },
  });
  const intl = useIntl();
  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    setState({ ...state, ...coordinate });
    nextPage();
  };
  const handleChange = (ev, type, subType) => {
    const updObj = { ...coordinate };
    console.log(type, 'type');
    console.log(updObj, 'updObj');
    if (subType)updObj[type][subType] = ev.target.value;
    else updObj[type] = ev.target.value;
    setCoordinate(updObj);
  };

  if (step !== 1) {
    return null;
  }
  return (
    <div className="wizard__wrapper-form">
      <Map state={coordinate} setState={setCoordinate} setShow={setShowMap} show={showMap} intl={intl} clear={clearErrors} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wizard__coord">
          <label className="input__label required">{intl.formatMessage(step2Input1)}</label>
          <div className="wizard__wrapper-input">
            <CustomInput
              type="text"
              error={errors.longitude}
              placeholder={intl.formatMessage(step2Input1Place1)}
              register={register({ required: 'This is required' })}
              value={coordinate.coordinate.longitude}
              name="longitude"
              change={(ev) => { handleChange(ev, 'coordinate', 'longitude'); }}
            />
            <CustomInput
              type="text"
              error={errors.latitude}
              placeholder={intl.formatMessage(step2Input1Place2)}
              register={register({ required: 'This is required' })}
              value={coordinate.coordinate.latitude}
              name="latitude"
              change={(ev) => { handleChange(ev, 'coordinate', 'latitude'); }}
            />
          </div>
        </div>
        <div className="wizard__btn-map">
          <CustomBtn label={intl.formatMessage(step2BtnLabel)} handleClick={() => setShowMap(true)} iconClass="icon-marker" customClass="btn__map" />
        </div>
        <div className="wizard__coord-region">
          <CustomInput
            type="text"
            label={intl.formatMessage(step2Input2)}
            placeholder=""
            register={register({ required: 'This is required' })}
            value={coordinate.region}
            required
            error={errors.region}
            name=".region"
            change={(ev) => { handleChange(ev, 'region'); }}
          />
        </div>
        <div className="wizard__coord">
          <span className="input__label">{intl.formatMessage(step2CodePlus)}</span>
          <p className="wizard__code-plus">
            {coordinate.codePlus}
          </p>
        </div>
        <div className="wizard__wrapper-panel">
          <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => prevPage()} type="button" customClass="btn__cancel" />
          <CustomBtn label={intl.formatMessage(wizardBtnNext)} handleClick={() => {}} type="submit" />
        </div>
      </form>
    </div>

  );
};

export default ProjectLocation;
