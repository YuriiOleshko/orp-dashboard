/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Loader from 'src/components/Loader/Loader';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import { getJSONFileFromIpfsNew } from 'src/state/ipfs';

const SampleTree = ({ treeName,
  status,
  height,
  diameter,
  treePhoto,
  labelPhoto }) => {
  const [previewImg, setPreviewImg] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const nameSlice = (fileName) => `${fileName.slice(0, 15)}...${fileName.slice(fileName.length - 5, fileName.length)}`;

  const showPreviewPhoto = async (photoCid) => {
    setShowPreview(true);

    let ipfsPhoto = await getJSONFileFromIpfsNew(photoCid);
    ipfsPhoto = await JSON.parse(JSON.parse(ipfsPhoto));

    const base64Photo = ipfsPhoto.data.includes('data:') ? ipfsPhoto.data : `data:${ipfsPhoto.mime};base64,${ipfsPhoto.data}`;
    setPreviewImg(base64Photo);
  };

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
        <div className="tree" onClick={() => showPreviewPhoto(treePhoto)}>
          <span className="upload-preview_photo">{nameSlice(treePhoto)}</span>
        </div>
        <div className="tree" onClick={() => showPreviewPhoto(labelPhoto)}>
          <span className="upload-preview_photo">{nameSlice(labelPhoto)}</span>
        </div>
        {showPreview && (
        <div className="photo__preview">
          <div className="photo__preview-background" />
          {previewImg ? (
            <img src={previewImg} alt="alt" />
          ) : (
            <Loader customClass="lds-ring__small" />
          )}
          <CustomBtn
            label="Close"
            customClass="btn__cancel"
            handleClick={() => setShowPreview(false)}
            iconClass="icon-close"
          />
        </div>
        )}
      </div>
    </>
  );
};
export default SampleTree;
