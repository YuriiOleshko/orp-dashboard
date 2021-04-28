import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import {
  // eslint-disable-next-line no-unused-vars
  DropzoneBtn, wizardFiles, step3Public, step3Private, step2GeoBtn, DropzoneReplace, DropzoneDelete,
} from '../../LangWizardForm';
import { initIPFS } from '../../../../state/ipfs';
import { appStore } from '../../../../state/app';

const DropzoneInput = ({ classCustom, change, multi, amountFiles = 1, state, filesSave, setFilesSave }) => {
  const [previewImg, setPreviewImg] = useState('');
  const [myFiles, setMyFiles] = useState([]);
  const { update } = useContext(appStore);

  const onDrop = useCallback(async (acceptedFiles) => {
    const newArray = [];
    const currentlyFiles = [...myFiles, ...acceptedFiles];
    console.log(currentlyFiles, 'currentlyFiles');
    console.log(acceptedFiles, 'acceptedFiles');
    if (currentlyFiles.length >= 10) currentlyFiles.splice(10);
    currentlyFiles.forEach((el, index, arr) => {
      const reader = new window.FileReader();
      const readerUrl = new window.FileReader();
      reader.readAsArrayBuffer(el);
      readerUrl.readAsDataURL(el);
      reader.onloadend = () => {
        console.log(reader, 'reader');

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
      console.log(buffer, 'buffer');
      newArray.push({ path, content: buffer });
      const addOptions = {
        pin: true,
        wrapWithDirectory: true,
        timeout: 10000,
      };
      const ipfs = await initIPFS();

      if (index === (arr.length - 1)) {
        let count = 0;
        update('loading', true);
        const resultArray = [];
        console.log(newArray, 'newArray');
        for await (const result of ipfs.addAll(newArray, addOptions)) {
          console.log(result, 'resultArray');
          console.log(count, 'count');
          console.log(newArray.length, 'result.length');
          if (!result.path) {
            if (multi) change({ filesCidDir: result.cid.string });
            else change({ iconCidDir: result.cid.string });
          } else resultArray.push({ idCid: result.cid.string, private: false, path: result.path });

          count++;
        }
        if (multi) setFilesSave([...filesSave, ...resultArray]);

        update('loading', false);
      }
    };
    console.log(currentlyFiles, 'end');

    if (multi) setMyFiles([...currentlyFiles]);
    else setMyFiles([...acceptedFiles]);
  }, [myFiles]);
  const intl = useIntl();
  const validFile = (file) => {
    console.log(file, 'file');
    const unique = myFiles.map((el) => el.path).some((el, index, arr) => arr.includes(file.path));
    console.log(unique, 'unqier');
    if (unique && myFiles.length) {
      return null;
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: amountFiles, multiple: multi, validator: validFile });

  const removeFile = (file) => {
    console.log(file, 'file');
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (!multi) {
      setPreviewImg('');
    }
  };

  const chekSaveArray = (path) => {
    const privateType = filesSave.find((el) => el.path === path);
    console.log(privateType, 'private');
    if (privateType) return privateType.private;
    return false;
  };
  const changeTypeFiles = (path) => {
    console.log(filesSave, 'index');
    console.log(path, 'path');
    const currentlyArray = filesSave.map((el) => {
      if (el.path === path) {
        el.private = !el.private;
      }
      return el;
    });
    console.log(currentlyArray, 'currentlyArray');
    setFilesSave(currentlyArray);
  };
  const files = myFiles.map((file, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index + file.path + index + file.path}>
      {index + 1}
      .
      {' '}
      {file.path}
      {' '}
      <i className="icon-trash" onClick={() => removeFile(file)} />
      {multi && filesSave.length > 0
          && (
          <div onClick={() => changeTypeFiles(file.path)}>
            {chekSaveArray(file.path)
              ? (
                <div className="wizard__file-types">
                  <i className="icon-without-eye" />

                  <span className="gray">
                    {intl.formatMessage(step3Public)}
                  </span>
                </div>
              ) : (
                <div className="wizard__file-types">
                  <i className="icon-eye" />
                  <span className="blue">
                    {intl.formatMessage(step3Private)}
                  </span>
                </div>
              )}
          </div>
          )}

    </li>
  ));

  const getIpfsFile = async () => {
    const ipfs = await initIPFS();
    if (multi && state.filesCidDir) {
      const updateArray = [];
      for await (const file of ipfs.get(state.filesCidDir)) {
        // eslint-disable-next-line no-continue
        if (!file.content) continue;
        updateArray.push({ path: file.path.split('/')[1] });
        const content = [];
        for await (const chunk of file.content) {
          content.push(chunk);
        }
      }
      setMyFiles(updateArray);
    } else if (!multi && state.iconCidDir) {
      let count = 0;
      for await (const file of ipfs.get(state.iconCidDir)) {
        if (count === 1) {
          const path = `https://gateway.ipfs.io/ipfs/${file.path}`;
          setPreviewImg(path);
        }
        count++;
      }
    }
  };

  useEffect(async () => {
    await getIpfsFile();
  }, []);
  console.log(filesSave, '@@@@');

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
            <ul>{files}</ul>
          </aside>
        )}
        <div className={customCreator} {...getRootProps()}>
          {previewImg
            ? (
              <div className="wizard__creator-wrapper">
                <input {...getInputProps()} />
                <i className="icon-replace" />
                <span>{intl.formatMessage(DropzoneReplace)}</span>
              </div>
            )
            : (
              <div className="wizard__creator-wrapper">
                <input {...getInputProps()} />

                <i className="icon-plus-cir" />
                <span>{multi ? intl.formatMessage(step2GeoBtn) : intl.formatMessage(DropzoneBtn)}</span>
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
