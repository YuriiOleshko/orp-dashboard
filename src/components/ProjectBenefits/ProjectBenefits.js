/* eslint-disable linebreak-style */
import React from 'react';

const ProjectBenefits = ({ data }) => (
  <div className="benefits-list">
    { data.map((el, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={el.src + index + 2}
        className="wizard__icon-item active"
      >
        <img src={el.src} alt="img" />
      </div>
    ))}
  </div>
);

export default ProjectBenefits;
