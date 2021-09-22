import React, { useState } from 'react';
import CustomInput from 'src/generic/CustomInput';
import {
  step1Input1Place,
  step1CreatorLabel, step1Input5Place,
} from '../WizardForm/LangWizardForm';

const FunderInfo = ({ inputsArray,
  change,
  registerName,
  registerInfo,
  // eslint-disable-next-line no-unused-vars
  registerPart,
  count,
  intl,
  deleteInput,
  control,
  setInputElement,
  disableBtn }) => {
  const [error, setError] = useState('');

  const checkFundersArr = () => {
    const parts = inputsArray.map((item) => Object.values(item)[Object.values(item).length - 1]);
    if ((parts.map((part) => part[0] === '0')).includes(true)) {
      disableBtn(true);
    }
  };
  const checkFunderPart = (part) => {
    checkFundersArr();
    if (part[0] > 0) {
      setError('');
    } else {
      disableBtn(true);
      setError({
        type: 'parts',
      });
    }
  };
  return (
    <>
      {count > 0 ? (
        <div className="wizard__funder sup">
          <div className="wizard__wrapper-input">
            <div className="wizard__funder-name">
              <CustomInput
                type="text"
                placeholder={intl.formatMessage(step1Input1Place)}
                register={registerName}
                value={inputsArray[count].name}
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
                value={inputsArray[count].desc}
                name={`funders.${count}.desc`}
                change={(ev) => change(ev, `FunderName${count}`, count)}
              />
              <CustomInput
                control={control}
                placeholder="%"
                value={inputsArray[count].part}
                name={`funders.${count}.part`}
                usdMask
                suffix="%"
                change={(ev) => { change(ev, 'FunderPart', count, true); checkFunderPart(ev.value); }}
                click={(ev) => setInputElement(ev.target)}
                error={error}
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
              value={inputsArray[0].name}
              name="funders.0.name"
              change={(ev) => change(ev, 'FunderName', count)}
            />

            <div className="wizard__funder-info">
              <CustomInput
                type="text"
                placeholder={intl.formatMessage(step1Input5Place)}
                register={registerInfo}
                value={inputsArray[0].desc}
                name="funders.0.desc"
                change={(ev) => change(ev, 'FunderInfo', count)}
              />
              <CustomInput
                control={control}
                placeholder="%"
                value={inputsArray[0].part}
                name="funders.0.part"
                usdMask
                suffix="%"
                change={(ev) => { change(ev, 'FunderPart', count, true); checkFunderPart(ev.value); }}
                click={(ev) => setInputElement(ev.target)}
                error={error}
              />
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default FunderInfo;
