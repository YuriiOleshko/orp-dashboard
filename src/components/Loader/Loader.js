/* eslint-disable linebreak-style */
import React from 'react';

const Loader = ({ customClass }) => (
  <div className={`lds-ring ${customClass}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
