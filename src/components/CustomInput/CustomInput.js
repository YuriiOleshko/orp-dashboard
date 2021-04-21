import React from 'react';

const CustomInput = ({ type, placeholder, name, value, label, error, register, required, iconClass, change, onlyNumber }) => {
  const inputType = type || 'text';
  const changeError = (typeError) => {
    if (typeError === 'required') {
      return 'This field is required';
    } if (typeError === 'pattern') {
      return 'This email is not currently';
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
  const classInput = `${error ? 'error' : ''}`;
  return (
    <div className="input">
      {label && <label className={customLabelClass}>{label}</label>}
      {iconClass && <i className={cssImage} />}
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        defaultValue={value}
        ref={register}
        className={classInput}
        onKeyPress={onlyNumber ? onNumberOnlyChange : () => {}}
        onChange={change}
        onWheel={(ev) => ev.target.blur()}
      />
      {error && <div className="input__error">{changeError(error.type)}</div>}

    </div>
  );
};

export default CustomInput;
