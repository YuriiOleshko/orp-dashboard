import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import {
  // eslint-disable-next-line no-unused-vars
  DropzoneBtn, wizardFiles, DropzoneReplace, DropzoneDelete,
} from '../../LangWizardForm';
import { initIPFS } from '../../../../state/ipfs';

const DropzoneInput = ({ classCustom, change, multi, amountFiles = 1 }) => {
  const [previewImg, setPreviewImg] = useState('');
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    console.log(myFiles.length, 'amountFiles.length ');
    if (myFiles.length >= 10) return false;
    const newArray = [];
    acceptedFiles.forEach((el, index, arr) => {
      const reader = new window.FileReader();
      const readerUrl = new window.FileReader();
      reader.readAsArrayBuffer(el);
      readerUrl.readAsDataURL(el);

      reader.onloadend = () => {
        // eslint-disable-next-line no-use-before-define
        convertToBuffer(reader, index, arr, el.path);
      };
      if (!multi) {
        readerUrl.onloadend = (event) => {
          setPreviewImg(event.target.result);
        };
      }
    });
    const convertToBuffer = async (reader, index, arr, path) => {
      const buffer = await Buffer.from(reader.result);
      newArray.push({ path, content: buffer });
      const addOptions = {
        pin: true,
        wrapWithDirectory: true,
        timeout: 10000,
      };
      const ipfs = await initIPFS();
      if (index === (arr.length - 1)) {
        const count = 0;
        for await (const result of ipfs.addAll(newArray, addOptions)) {
          if (count === 0) {
            if (multi) change({ filesCidDir: result.cid.string });
            else change({ iconCidDir: result.cid.string });
          }
        }
      }
      // set this buffer -using es6 syntax
    };
    console.log(myFiles, 'myFiles');
    console.log(acceptedFiles, 'acceptedFiles');
    setMyFiles([...myFiles, ...acceptedFiles]);
  }, [myFiles]);
  const intl = useIntl();
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: amountFiles, multiple: multi });

  const removeFile = (file) => {
    console.log(file, 'file');
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (!multi) {
      setPreviewImg('');
    }
  };
  const files = myFiles.map((file, index) => (
    <li key={file.path}>
      {index + 1}
      .
      {' '}
      {file.path}
      {' '}
      <i className="icon-trash" onClick={() => removeFile(file)} />
    </li>
  ));
  console.log(myFiles, 'myFiles');
  const customClass = `dropzone ${classCustom}`;
  const customCreator = `wizard__creator ${multi ? 'multi' : ''}`;
  return (
    <div className="wizard__drop-zone">
      {!multi
        ? (
          <div {...getRootProps({ className: customClass })}>
            <input {...getInputProps()} />
            <i className="icon-iconfile" />
            {previewImg && <div className="wizard__drop-icone"><img src={previewImg} alt="alt" /></div> }
            {/* eslint-disable-next-line react/no-unescaped-entities */}
          </div>
        ) : null}
      <div className="wizard__drop-panel">
        {multi && myFiles.length > 0
        && (
          <aside>
            {/* <h4>{intl.formatMessage(wizardFiles)}</h4> */}
            <ul>{files}</ul>
          </aside>
        )}
        <div className={customCreator} {...getRootProps()}>
          {previewImg
            ? (
              <div className="wizard__creator-wrapper">
                <i className="icon-replace" />
                <span>{intl.formatMessage(DropzoneReplace)}</span>
              </div>
            )
            : (
              <div className="wizard__creator-wrapper">
                <input {...getInputProps()} />

                <i className="icon-plus-cir" />
                <span>{intl.formatMessage(DropzoneBtn)}</span>
              </div>
            )}
        </div>
        { previewImg && (
        <div className="wizard__creator wizard__creator_delete" onClick={() => removeFile(myFiles[0])}>
          <i className="icon-trash" />
          <span>{intl.formatMessage(DropzoneDelete)}</span>
        </div>
        )}
      </div>
    </div>
  );
};

export default DropzoneInput;
