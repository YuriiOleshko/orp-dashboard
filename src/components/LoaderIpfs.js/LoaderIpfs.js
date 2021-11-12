import React, { useEffect } from 'react';

const LoaderIpfs = ({ customClass = '', text, error = true }) => {
  const cssClass = `wizard__loading ${customClass}`;
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  return (
    <div className={cssClass}>
      {error && <i className="icon-shield" />}
      {text || 'Registering your project details, please wait as this might take a few moments'}
    </div>
  );
};

export default LoaderIpfs;
