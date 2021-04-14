import React from 'react';
import {
  step1Input1Place,
  step1CreatorLabel, step1Input5Place, step1Input5Info,
} from '../../LangWizardForm';
import CustomInput from '../../../CustomInput';

const FunderInfo = ({ inputsArray, change, registerName, registerInfo, count, intl, deleteInput }) => (
  <>
    {count > 0 ? (
      <div className="wizard__funder sup">
        <div className="wizard__wrapper-input">
          <CustomInput
            type="text"
            placeholder={intl.formatMessage(step1Input1Place)}
            register={registerName}
            value={inputsArray[count][`FunderName${count}`]}
            name={`funders.${count}.name`}
            change={(ev) => change(ev, `FunderName${count}`, count)}

          />
          <div className="wizard__wrap-close">
            <CustomInput
              type="text"
              placeholder={intl.formatMessage(step1Input5Place)}
              register={registerInfo}
              value={inputsArray[count][`FunderInfo${count}`]}
              name={`funders.${count}.desc`}
              change={(ev) => change(ev, `FunderInfo${count}`, count)}
            />
            <i className="wizard__close icon-close" onClick={() => deleteInput(count)} />
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
          <div className="wizard__wrap-close">
            <CustomInput
              type="text"
              label={intl.formatMessage(step1Input5Info)}
              placeholder={intl.formatMessage(step1Input5Place)}
              register={registerInfo}
              value={inputsArray[0].FunderInfo}
              name="funders.0.desc"
              change={(ev) => change(ev, 'FunderInfo', count)}
            />
          </div>
        </div>
      </div>

    )}
  </>
);

export default FunderInfo;
