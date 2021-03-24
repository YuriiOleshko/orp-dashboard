import React from 'react';

const CustomInput = ({ type, placeholder, name, value, label, error, register }) => {
  const inputType = type || 'text';
  const changeError = (typeError) => {
    if (typeError === 'required') {
      return 'This field is required';
    } if (typeError === 'pattern') {
      return 'This email is not currently';
    }
    return '';
  };
  return (
    <div className="input">
      <label
        className="input__label"
      >
        {label}
      </label>
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        ref={register}
      />
      {error && <div className="input__error">{changeError(error.type)}</div>}

    </div>
  );
};

export default CustomInput;
