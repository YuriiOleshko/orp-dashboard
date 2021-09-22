/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import CustomBtn from 'src/generic/CustomBtn';
import PreviewSampleTree from '../PreviewSampleTree/PreviewSampleTree';

const SampleZoneItem = ({ sampleName,
  coordinates,
  sampleTrees }) => {
  const [hideElement, setHideElement] = useState(true);
  return (
    <div className="sample-zone">
      <div className="sample-zone__header">
        <div className="sample-zone__header-name">
          <span>{sampleName}</span>
        </div>
        <div className="sample-zone__header-coord">
          <span className="sample-zone__coord">{coordinates[0]}</span>
          <span className="sample-zone__coord">{coordinates[1]}</span>
        </div>
        <div className={`sample-zone__header-btn ${hideElement ? 'up' : 'dropdown'}`}>
          <CustomBtn
            label={(
              <i
                className={`icon-collapse-arrow ${hideElement ? 'up' : 'dropdown'}`}
              />
            )}
            handleClick={() => setHideElement(!hideElement)}
            // handleClick={() => toggleDropDown(sampleName)}
            customClass="sample-zone__btn"
          />
        </div>
      </div>
      {/* <div className={`sample-zone__content ${!drops.includes(sampleName) ? 'up' : 'dropdown'}`}> */}
      <div className={`sample-zone__content ${hideElement ? 'up' : 'dropdown'}`}>
        <div className="content-header">
          <span className="header-tree">Tree</span>
          <span className="header-status">Tree status</span>
          <span className="header-height">Height, sm</span>
          <span className="header-diameter">Diameter, sm</span>
          <span className="header-tree-photo">Upload tree photo</span>
          <span className="header-label-photo">Upload tree label photo</span>
        </div>
        <div className="content-list">
          {sampleTrees.map((item, index) => (
            <PreviewSampleTree
              treePhoto={item.treePhoto}
              labelPhoto={item.labelPhoto}
              treeName={item.treeName}
              status={item.status}
              height={item.height}
              diameter={item.diameter}
              key={`tree ${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleZoneItem;
