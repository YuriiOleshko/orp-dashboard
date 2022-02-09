/* eslint-disable */
import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import { initIPFS } from 'src/state/ipfs';
import Loader from 'src/components/Loader/Loader';

export const IconCropper = ({ imageFile, change, setOpenCropper, setPreviewImg, iconType }) => {
  const imageSrc = URL.createObjectURL(imageFile);
  const [image, setImage] = useState(imageSrc);
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  const [loading, setLoading] = useState(false);

  const newArray = [];

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const sendToIpfs = async (arrBuff, path) => {
    setLoading(true);
    const buffer = await Buffer.from(arrBuff);
    newArray.push({ path, content: buffer });
    const addOptions = {
      pin: true,
      wrapWithDirectory: true,
      timeout: 10000,
    };
    const ipfs = await initIPFS();
  
    for await (const result of ipfs.addAll(newArray, addOptions)) {
      change({ [iconType]: `/ipfs/${result.cid.string}` });
    }
    setPreviewImg(cropData);
    setOpenCropper(false);
    setLoading(false);
  }

  const uploadImage = () => {
    cropper.getCroppedCanvas().toBlob((blob) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(blob);
      fileReader.onload = function(event) {
          const arrayBuffer = event.target.result;
          sendToIpfs(arrayBuffer, imageFile.path);
      };
    }, imageFile.type);
  };

  return (
    <div className="cropper__wrapper">
      {loading && <div className='cropper__loader'><Loader /></div>}
      <div className="cropper-close">
        <CustomBtn
          label=""
          customClass="btn__cancel"
          handleClick={() => setOpenCropper(false)}
          iconClass="icon-close"
        />
      </div>
      <div className='cropper-background' />
      <div className="cropper">
        <div className="cropper-icon">
          {/* <input type="file" onChange={onChange} /> */}
          <Cropper
            style={{ height: '450px', width: '100%' }}
            zoomTo={0.15}
            initialAspectRatio={iconType === 'iconCidDir' ? 1 : 16 / 9}
            aspectRatio={iconType === 'iconCidDir' ? 1 : 16 / 9}
            preview=".img-preview"
            src={image}
            viewMode={2}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background
            modal
            highlight
            guides
            center
            responsive
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <div className="cropper-btn">
            <CustomBtn label="Crop Image" handleClick={getCropData} customClass="btn__next" />
            <CustomBtn disabled={!cropData} label="Upload Image" handleClick={uploadImage} customClass={`btn__next ${!cropData && 'btn__next-disabled'}`} />
          </div>
        </div>
        <div className="cropper-output">
          {/* <div className="cropper-preview">
            <h1>Preview</h1>
            <div className="img-preview" />
          </div> */}

          {cropData && (
            <div className="cropper-result">
              <h2>
                Preview
              </h2>
              <img src={cropData} alt="cropped" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IconCropper;
