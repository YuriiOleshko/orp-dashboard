import * as React from 'react';

const CustomBtn = ({ label, handleClick, customClass, iconClass, type }) => {
  const cssClass = `btn ${customClass}`;
  const cssImage = `def ${iconClass}`;
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={cssClass}
      onClick={(e) => handleClick(e)}
    >
      {iconClass && <i className={cssImage} />}
      <span>
        {label}
      </span>
    </button>
  );
};

export default CustomBtn;
