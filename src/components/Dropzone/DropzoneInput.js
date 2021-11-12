/* eslint-disable react/no-this-in-sfc */
import React, {
  useCallback, useContext, useEffect,
} from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import {
  // eslint-disable-next-line no-unused-vars
  DropzoneBtn, wizardFiles, step3Public, step3Private, step2GeoBtn, DropzoneReplace, DropzoneDelete,
} from '../WizardForm/LangWizardForm';
import { initIPFS } from '../../state/ipfs';
import { appStore } from '../../state/app';
import { ipfsURL } from '../../state/near';

const MIN_WIDTH_RES = 200;
const MIN_HEIGHT_RES = 200;

const DropzoneInput = ({ classCustom,
  change,
  multi,
  amountFiles = 1,
  state,
  filesSave,
  setFilesSave,
  myFiles,
  setMyFiles,
  previewImg,
  setPreviewImg,
  edit = false,
  convertFiles,
  setConvertFiles,
  acceptedFileTypes,
  setResolutionWarning,
  showFileStatus = true }) => {
  // const [previewImg, setPreviewImg] = useState('');
  const { update } = useContext(appStore);
  const newArray = [];

  const convertToBuffer = async (reader, index, arr, path) => {
    const buffer = await Buffer.from(reader.result);
    newArray.push({ path, content: buffer });
    const addOptions = {
      pin: true,
      wrapWithDirectory: true,
      timeout: 10000,
    };
    const ipfs = await initIPFS();

    if (index === (arr.length - 1) && !edit) {
      let count = 0;
      update('loading', true);
      const resultArray = [];
      for await (const result of ipfs.addAll(newArray, addOptions)) {
        if (!result.path) {
          if (multi) change({ filesCidDir: `/ipfs/${result.cid.string}` });
          else change({ iconCidDir: `/ipfs/${result.cid.string}` });
        } else resultArray.push({ private: false, path: result.path });
        // eslint-disable-next-line no-unused-vars
        count++;
      }
      if (multi) setFilesSave([...filesSave, ...resultArray]);

      update('loading', false);
    } else if (edit) {
      if (multi) {
        const resultArray = [];
        setConvertFiles([...convertFiles, ...newArray]);
        newArray.forEach((el) => resultArray.push({ private: false, path: el.path }));
        setFilesSave([...filesSave, ...resultArray]);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const currentlyFiles = [...myFiles, ...acceptedFiles];
    if (currentlyFiles.length >= 10) currentlyFiles.splice(10);
    currentlyFiles.forEach((el, index, arr) => {
      const reader = new window.FileReader();
      const readerUrl = new window.FileReader();
      reader.readAsArrayBuffer(el);
      readerUrl.readAsDataURL(el);
      reader.onloadend = (e) => {
        if (!multi) {
          const blob = new Blob([e.target.result]);
          const objUrl = URL.createObjectURL(blob);
          const image = new Image();
          image.src = objUrl;
          image.onload = function () {
            if (this.height >= MIN_HEIGHT_RES && this.width >= MIN_WIDTH_RES) {
              setResolutionWarning('');
              // eslint-disable-next-line no-use-before-define
              convertToBuffer(reader, index, arr, el.path);
            } else {
              setResolutionWarning(`Photo resolution must be more than ${MIN_WIDTH_RES}x${MIN_HEIGHT_RES}`);
            }
          };
        } else {
          // eslint-disable-next-line no-use-before-define
          convertToBuffer(reader, index, arr, el.path);
        }
      };
      if (!multi) {
        readerUrl.onloadend = (event) => {
          const image = new Image();
          image.src = event.target.result;
          image.onload = function () {
            if (this.height >= MIN_HEIGHT_RES && this.width >= MIN_WIDTH_RES) {
              setResolutionWarning('');
              setPreviewImg(event.target.result);
            } else {
              setResolutionWarning(`Photo resolution must be more than ${MIN_WIDTH_RES}x${MIN_HEIGHT_RES}`);
            }
          };
        };
      }
    });

    if (multi) setMyFiles([...currentlyFiles]);
    else setMyFiles([...acceptedFiles]);
  }, [myFiles]);
  const intl = useIntl();
  const validFile = (file) => {
    const unique = myFiles.map((el) => el.path).some((el, index, arr) => arr.includes(file.path));
    if (unique && myFiles.length) {
      return null;
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes,
    onDrop,
    maxFiles: amountFiles,
    multiple: multi,
    validator: validFile,
  });

  const removeFile = (file, indexItem) => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    if (edit) {
      const newConvert = [...convertFiles];
      newConvert.splice(indexItem, 1);
      setConvertFiles(newConvert);
    }
    if (!multi) {
      setPreviewImg('');
      change({ iconCidDir: '' });
    } else {
      const newSave = [...filesSave];
      newSave.splice(indexItem, 1);
      setFilesSave(newSave);
    }
    newFiles.forEach((el, index, arr) => {
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
  };

  const chekSaveArray = (path) => {
    const privateType = filesSave.find((el) => el.path === path);
    if (privateType) return privateType.private;
    return false;
  };
  const changeTypeFiles = (path) => {
    const currentlyArray = filesSave.map((el) => {
      if (el.path === path) {
        el.private = !el.private;
      }
      return el;
    });
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
      <i className="icon-trash" onClick={() => removeFile(file, index)} />
      {showFileStatus && multi && filesSave.length > 0
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

  // eslint-disable-next-line no-unused-vars
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
          const path = `${ipfsURL}${file.path}`;
          setPreviewImg(path);
        }
        count++;
      }
    }
  };

  useEffect(async () => {
    // await getIpfsFile();
  }, []);

  const customClass = `dropzone ${classCustom}`;
  const customCreator = `wizard__creator ${multi ? 'multi' : ''}`;
  return (
    <div className={`wizard__drop-zone ${acceptedFileTypes ? 'file-types' : ''}`}>
      {!multi
        ? (
          <div {...getRootProps({ className: customClass })}>
            <input {...getInputProps()} />
            <i className="icon-iconfile" />
            {previewImg && <div className="wizard__drop-icone"><img src={previewImg} alt="alt" /></div>}
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
              <div className="wizard__creatorx-wrapper">
                <input {...getInputProps()} />

                <i className="icon-plus-cir" />
                <span>{multi ? intl.formatMessage(step2GeoBtn) : intl.formatMessage(DropzoneBtn)}</span>
              </div>
            )}
        </div>
        {previewImg && (
          <div className="wizard__creator wizard__creator_delete" onClick={() => removeFile(myFiles[0])}>
            <i className="icon-trash" />
            <span>{intl.formatMessage(DropzoneDelete)}</span>
          </div>
        )}
      </div>
      {acceptedFileTypes ? <label className="wizard__file-list">{`.${acceptedFileTypes.replace(/[.]/g, ' ')} (files accepted)`}</label>
        : ''}
    </div>
  );
};

export default DropzoneInput;
