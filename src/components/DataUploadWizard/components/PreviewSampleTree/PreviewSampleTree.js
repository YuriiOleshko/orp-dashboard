/* eslint-disable no-unused-vars */
import React from 'react';

const SampleTree = ({ treeName,
  status,
  height,
  diameter,
  treePhoto,
  labelPhoto }) => {
  const nameSlice = (fileName) => `${fileName.slice(0, 20)}...${fileName.slice(fileName.length - 5, fileName.length)}`;
  return (
    <>
      <div className="tree-item upload-preview_item">
        <div className="tree">
          <span className="upload-preview_name">{treeName}</span>
        </div>
        <div className="tree">
          <span className="upload-preview_status">{status}</span>
        </div>
        <div className="tree">
          <span className="upload-preview_size">{height}</span>
        </div>
        <div className="tree">
          <span className="upload-preview_size">{diameter}</span>
        </div>
        <div className="tree">
          <span className="upload-preview_photo">{nameSlice(treePhoto)}</span>
        </div>
        <div className="tree">
          <span className="upload-preview_photo">{nameSlice(labelPhoto)}</span>
        </div>
      </div>
    </>
  );
};
export default SampleTree;
