/* eslint-disable */
import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { appStore } from 'src/state/app';
import { getJSONFileFromIpfsNew, initIPFS } from 'src/state/ipfs';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import Loader from '../Loader/Loader';

const UploadImage = ({
  photo,
  name,
  multiple,
  control,
  setValue,
  getValues,
  error,
  rules
}) => {
  const { update } = useContext(appStore);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ accept: 'image/jpeg, image/png' });
  const [photoCid, setPhotoCid] = useState(photo);
  const [previewImg, setPreviewImg] = useState();
  const [showPreview, setShowPreview] = useState(false);

  const removeFile = () => {
    acceptedFiles.splice(0, 1);
    setValue(name, '', { shouldValidate: true });
    setPhotoCid();
  }

  const showPreviewPhoto = async () => {
    setShowPreview(true);

    let ipfsPhoto = await getJSONFileFromIpfsNew(photoCid);
    ipfsPhoto = await JSON.parse(JSON.parse(ipfsPhoto));

    const base64Photo = ipfsPhoto.data.includes('data:') ? ipfsPhoto.data : `data:${ipfsPhoto.mime};base64,${ipfsPhoto.data}`;
    setPreviewImg(base64Photo);
  };

  const sendImageToIpfs = async (url, path) => {
    update('loading', true);

    const extension = path.match(/^.*\.(jpg|jpeg|png)$/i);
    if (extension[1].toLowerCase() === 'jpg') extension[1] = 'jpeg';
    const mimeType = `image/${extension[1].toLowerCase()}`;

    const dataToSend = JSON.stringify({ path, mime: mimeType, data: url });

    const ipfs = await initIPFS();
    const result = await ipfs.add(JSON.stringify(dataToSend));
    if (result.path) {
      setValue(name, `/ipfs/${result.cid.string}`, { shouldValidate: true });
      setPhotoCid(`/ipfs/${result.cid.string}`);
    }
    update('loading', false);
  };

  const classInput = `${error ? `photo__uploader error__background` : 'photo__uploader'}`;

  useEffect(async () => {
    if (photoCid && !getValues(name)) {
      setValue(name, photoCid);
    }
  }, [])

  return (
    <>
      <Controller
        render={({ onChange: change }) => {
          const onChange = (e) => {
            change(e.target.files[0]);
            const reader = new window.FileReader();
            const readerUrl = new window.FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
            readerUrl.readAsDataURL(e.target.files[0]);
            readerUrl.onloadend = (event) => {
              sendImageToIpfs(event.target.result, e.target.files[0].path);
              setPreviewImg(event.target.result);
            };
          }
          return (
            <div {...getRootProps()}>
              <input {...getInputProps({ onChange })} />
              <span className={classInput}>Upload</span>
            </div>
          )
        }}
        name={name}
        control={control}
        defaultValue=''
        rules={rules}
      />
      {photoCid && (
        <div className="photo__result">
          <span onClick={showPreviewPhoto}>{photoCid}</span>
          <i className="icon-close" onClick={() => removeFile()} />
        </div>
      )}
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
    </>
  )
};

export default UploadImage;
