import * as React from 'react';

const CustomBtn = ({ label, handleClick, customClass, iconClass, type, disabled }) => {
  const cssClass = `btn ${customClass}`;
  const cssImage = `def ${iconClass}`;
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={cssClass}
      onClick={(e) => handleClick(e)}
      disabled={disabled}
    >
      {iconClass && <i className={cssImage} />}
      <span>
        {label}
      </span>
    </button>
  );
};

export default CustomBtn;
