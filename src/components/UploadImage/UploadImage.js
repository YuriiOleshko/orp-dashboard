/* eslint-disable */
import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { appStore } from 'src/state/app';
import { getFilesFromDirWithContent, initIPFS } from 'src/state/ipfs';
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
    const ipfs = await initIPFS();
    const ipfsPhoto = await getFilesFromDirWithContent(ipfs, photoCid);

    if (ipfsPhoto[0].path && ipfsPhoto[0].content) {
      const extension = ipfsPhoto[0].path.match(/^.*\.(jpg|jpeg|png)$/i);
      if (extension[1].toLowerCase() === 'jpg') extension[1] = 'jpeg';
      const mimeType = `image/${extension[1].toLowerCase()}`;

      const blobImage = new Blob(ipfsPhoto[0].content, { type: mimeType })
      const imageUrl = URL.createObjectURL(blobImage);
      setPreviewImg(imageUrl);
    }
  
  };

  const sendImageToIpfs = async (reader, path) => {
    update('loading', true);
    const buffer = await Buffer.from(reader.result);
    const dataToSend = { path, content: buffer };
    const addOptions = {
      pin: true,
      wrapWithDirectory: true,
      timeout: 10000,
    };
    const ipfs = await initIPFS();
    const result = await ipfs.add(dataToSend, addOptions);
    if (!result.path) {
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
            reader.onloadend = () => {
              sendImageToIpfs(reader, e.target.files[0].path);
            }
            readerUrl.onloadend = (event) => {
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
