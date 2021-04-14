import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  // eslint-disable-next-line no-unused-vars
  step2Input1, step2Input1Place1, step2Input1Place2, step2Input2, step2CodePlus, step2BtnLabel, wizardBtnNext, wizardBtnBack,
} from '../../LangWizardForm';
import CustomInput from '../../../CustomInput';
import CustomBtn from '../../../CustomBtn';
import Map from '../../../Map';

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
const ProjectLocation = ({ step, nextPage, prevPage, state, setState }) => {
  // eslint-disable-next-line no-unused-vars
  console.log(state.coordinate, state.coordinate);

  const defaultCoordinate = state.coordinate
    ? {
      region: state.region,
      polygon: state.polygon,
      codePlus: state.codePlus,
      polygonCoordinate: state.polygonCoordinate,
      square: state.square,
      coordinate: state.coordinate,
    } : { region: '',
      polygon: [],
      codePlus: null,
      polygonCoordinate: [],
      square: 0,
      coordinate: { longitude: '', latitude: '' } };
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const [showMap, setShowMap] = useState(false);
  const [coordinate, setCoordinate] = useState(defaultCoordinate);
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
  const { polygonCoordinate } = coordinate;
  return (
    <div className="wizard__wrapper-form">
      {showMap && <Map state={coordinate} setState={setCoordinate} setShow={setShowMap} intl={intl} clear={clearErrors} />}
      {' '}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wizard__coord-big">
          <div className="wizard__wrapper-input">
            <span className="input__label required">{intl.formatMessage(step2Input1)}</span>
            <div className="wizard__btn-map">
              <CustomBtn label={intl.formatMessage(step2BtnLabel)} handleClick={() => setShowMap(true)} iconClass="icon-remarker" customClass="btn__map" />
            </div>
          </div>
          <div className="wizard__wrapper-coor">
            {polygonCoordinate.length > 0 && polygonCoordinate[0].map((point, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="wizard__wrapper-input" key={point[0] + index}>
                <span className="wizard__word">
                  {alphabet[index]}
                  .
                </span>
                <p className="wizard__point-coord">
                  {parseFloat(point[0]).toFixed(9)}
                </p>
                <p className="wizard__point-coord">
                  {parseFloat(point[1]).toFixed(9)}
                </p>
              </div>
            ))}
          </div>
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
            name="region"
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
