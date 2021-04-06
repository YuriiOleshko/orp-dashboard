import React from 'react';

const CustomSelect = ({ name, value, optionArray, label, error, register, required, iconClass, change }) => {
  const changeError = (typeError) => {
    if (typeError === 'required') {
      return 'This field is required';
    } if (typeError === 'pattern') {
      return 'This email is not currently';
    }
    return '';
  };
  const customLabelClass = `${required ? 'required' : ''} input__label`;
  const cssImage = `def ${iconClass}`;
  const classInput = `${error ? 'error' : ''}`;
  return (
    <div className="input">
      {label && <label className={customLabelClass}>{label}</label>}
      {iconClass && <i className={cssImage} />}
      <select className={classInput} name={name} defaultValue={value} ref={register} onChange={change}>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {optionArray.map((el, index) => <option key={index + el.value} value={el.value}>{el.label}</option>)}
      </select>
      {error && <div className="input__error">{changeError(error.type)}</div>}

    </div>
  );
};

export default CustomSelect;
