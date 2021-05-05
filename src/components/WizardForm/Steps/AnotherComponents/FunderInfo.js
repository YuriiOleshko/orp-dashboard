import React from 'react';
import {
  step1Input1Place,
  step1CreatorLabel, step1Input5Place,
} from '../../LangWizardForm';
import CustomInput from '../../../CustomInput';

const FunderInfo = ({ inputsArray, change, registerName, registerInfo, registerPart, count, intl, deleteInput }) => (
  <>
    {count > 0 ? (
      <div className="wizard__funder sup">
        <div className="wizard__wrapper-input">
          <div className="wizard__funder-name">
            <CustomInput
              type="text"
              placeholder={intl.formatMessage(step1Input1Place)}
              register={registerName}
              value={inputsArray[count][`FunderName${count}`]}
              name={`funders.${count}.name`}
              change={(ev) => change(ev, `FunderName${count}`, count)}
            />
            <i className="wizard__delete-field icon-trash" onClick={() => deleteInput(count)} />
          </div>
          <div className="wizard__funder-info">
            <CustomInput
              type="text"
              placeholder={intl.formatMessage(step1Input5Place)}
              register={registerInfo}
              value={inputsArray[count][`FunderInfo${count}`]}
              name={`funders.${count}.desc`}
              change={(ev) => change(ev, `FunderInfo${count}`, count)}
            />
            <CustomInput
              type="number"
              placeholder="%"
              register={registerPart}
              value={inputsArray[count][`FunderPart${count}`]}
              name={`funders.${count}.part`}
              change={(ev) => change(ev, `FunderPart${count}`, count, true)}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="wizard__funder" key={`${count}FundersName${count}`}>
        <div className="wizard__wrapper-input">
          <CustomInput
            type="text"
            label={intl.formatMessage(step1CreatorLabel)}
            placeholder={intl.formatMessage(step1Input1Place)}
            register={registerName}
            value={inputsArray[0].FunderName}
            name="funders.0.name"
            change={(ev) => change(ev, 'FunderName', count)}
          />

          <div className="wizard__funder-info">
            <CustomInput
              type="text"
              placeholder={intl.formatMessage(step1Input5Place)}
              register={registerInfo}
              value={inputsArray[0].FunderInfo}
              name="funders.0.desc"
              change={(ev) => change(ev, 'FunderInfo', count)}
            />
            <CustomInput
              type="number"
              placeholder="%"
              register={registerPart}
              value={inputsArray[count][`FunderPart${count}`]}
              name="funders.0.part"
              change={(ev) => change(ev, `FunderPart${count}`, count, true)}
            />
          </div>
        </div>
      </div>

    )}
  </>
);

export default FunderInfo;
