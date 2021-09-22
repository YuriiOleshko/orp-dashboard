import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

const CustomInput = ({ type, placeholder, name, value, label, error, register, required, iconClass, change, onlyNumber, usdMask, control, prefix, suffix, rules, decimal, click, customClass, showErrorMessage = true, classError }) => {
  // eslint-disable-next-line
  const defaultValue = value ? value : '';
  const inputType = type || 'text';
  const [upd, setUpd] = useState(false);
  const changeError = (typeError) => {
    if (typeError === 'required') {
      return 'This field is required';
    } if (typeError === 'pattern') {
      return 'This email is not correct';
    } if (typeError === 'parts') {
      return 'Impossible, enter "0"';
    }
    return '';
  };
  const onNumberOnlyChange = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValid = new RegExp('[0-9]').test(keyValue);
    if (!isValid) {
      event.preventDefault();
    }
  };

  const customLabelClass = `${required ? 'required' : ''} input__label`;
  const cssImage = `def ${iconClass}`;
  const classInput = `${error ? `error ${classError}` : ''}`;
  return (
    <div className="input">
      {label && <label className={customLabelClass}>{label}</label>}
      {iconClass && <i className={cssImage} />}
      {usdMask ? (
        <Controller
          control={control}
          as={NumberFormat}
          rules={rules}
          name={name}
          thousandSeparator
          decimalScale={decimal ? 2 : null}
          // eslint-disable-next-line
          fixedDecimalScale={decimal ? true : false}
          decimalSeparator={decimal ? '.' : null}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder}
          className={classInput}
          defaultValue={defaultValue}
          onValueChange={change && ((v) => {
            change(v);
            setUpd(!upd);
          })}
          onClick={click}
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
          ref={register}
          className={`${classInput} ${customClass || ''}`}
          onKeyPress={onlyNumber ? onNumberOnlyChange : () => {}}
          onChange={change}
          onWheel={(ev) => ev.target.blur()}
        />
      )}
      {error && showErrorMessage && <div className="input__error">{changeError(error.type)}</div>}

    </div>
  );
};

export default CustomInput;
