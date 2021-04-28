import React from 'react';
import { ReactSVG } from 'react-svg';
import planetImg from '../../../../../assets/image/wizard/planet.svg';
import CustomBtn from '../../../../CustomBtn';
import {
  prevTitle,
  step2BtnLabel, wizardBtnBack, wizardBtnNext, prevDesc,
} from '../../../LangWizardForm';
import GeoJsonUploader from '../../AnotherComponents/GeoJsonUploader';

const PrevScreenLocation = ({ intl, coordinate, setCoordinate, jsonFile, state, setState,
  setJsonFile, setShowMap,
  prevPage }) => (
    <div className="prev-screen">
      <div className="prev-screen__wrapper">
        <div className="prev-screen__img">
          <ReactSVG src={planetImg} />
        </div>
        <div className="prev-screen__desc">
          <h2 className="prev-screen__title">{intl.formatMessage(prevTitle)}</h2>
          <p className="prev-screen__text">{intl.formatMessage(prevDesc)}</p>
        </div>
        <div className="prev-screen__panel-btn">
          <div className="prev-screen__wrap-btn">
            <CustomBtn label={intl.formatMessage(step2BtnLabel)} handleClick={() => setShowMap(true)} iconClass="icon-marker" customClass="btn__map" />
          </div>
          <div className="prev-screen__wrap-btn">

            <GeoJsonUploader coordinate={coordinate} setCoordinate={setCoordinate} jsonFile={jsonFile} setJsonFile={setJsonFile} setState={setState} state={state} setShowMap={setShowMap} />
          </div>
          <div className="prev-screen__wrap-btn">
            <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => prevPage()} type="button" customClass="btn__cancel" />
          </div>
          <div className="prev-screen__wrap-btn">

            <CustomBtn label={intl.formatMessage(wizardBtnNext)} handleClick={() => {}} type="submit" customClass="btn__cancel" />
          </div>

        </div>
      </div>

    </div>
);

export default PrevScreenLocation;
