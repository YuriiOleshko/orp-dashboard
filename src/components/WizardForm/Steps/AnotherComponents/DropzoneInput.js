import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import { wizardFiles } from '../../LangWizardForm';
import { initIPFS } from '../../../../state/ipfs';

const DropzoneInput = ({ classCustom, change, multi, amountFiles = 1 }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles, 'acceptedFilesacceptedFilesacceptedFilesacceptedFiles');
    const newArray = [];
    acceptedFiles.forEach((el, index, arr) => {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(el);
      // eslint-disable-next-line no-use-before-define
      reader.onloadend = () => convertToBuffer(reader, index, arr, el.path);
    });
    const convertToBuffer = async (reader, index, arr, path) => {
      console.log(reader, 'reader');
      const buffer = await Buffer.from(reader.result);
      newArray.push({ path, content: buffer });
      console.log(newArray, 'newArray');
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
  }, []);
  const intl = useIntl();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: amountFiles, multiple: multi });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {file.size}
      {' '}
      bytes
    </li>
  ));
  const customClass = `dropzone ${classCustom}`;
  return (
    <div>
      <div {...getRootProps({ className: customClass })}>
        <input {...getInputProps()} />
        <i className="icon-iconfile" />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p />
      </div>
      {files.length > 0
      && (
      <aside>
        <h4>{intl.formatMessage(wizardFiles)}</h4>
        <ul>{files}</ul>
      </aside>
      )}
    </div>
  );
};

export default DropzoneInput;
