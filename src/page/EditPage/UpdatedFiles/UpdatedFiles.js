import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  previewFiles, step3Private, step3Public,
} from '../../../components/WizardForm/LangWizardForm';
import { getFilesFromDirWithContent, initIPFS } from '../../../state/ipfs';

const UpdatedFiles = ({ state, loadingData, updatedFiles, setUpdatedFiles, privateFiles, setPrivateFiles }) => {
  const intl = useIntl();
  const [files, setFiles] = useState([]);

  const chekSaveArray = (path) => {
    if (!privateFiles) return false;
    const privateType = privateFiles.find((el) => el.path === path);
    if (privateType) return privateType.private;
    return false;
  };
  const removeFile = (file, index) => {
    const newFiles = [...files];
    const newPrivetFiles = [...privateFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    newPrivetFiles.splice(index, 1);
    setFiles(newFiles);
    setPrivateFiles(newPrivetFiles);
    setUpdatedFiles({ private: newPrivetFiles, files: newFiles });
  };
  useEffect(async () => {
    if (!loadingData) {
      const ipfs = await initIPFS();
      if (state.filesCidDir) {
        const updateArray = await getFilesFromDirWithContent(ipfs, state.filesCidDir);
        setPrivateFiles(state.privateFiles);
        setFiles(updateArray.map((el) => {
          el.content = el.content[0];
          return el;
        }));
        setUpdatedFiles({ private: state.privateFiles, files: updateArray });
      }
    }
  }, [loadingData]);

  const changeTypeFiles = (file) => {
    const { path } = file;
    const currentlyArray = privateFiles.map((el) => {
      if (el.path === path) {
        el.private = !el.private;
      }
      return el;
    });
    setPrivateFiles(currentlyArray);
    setUpdatedFiles({ ...updatedFiles, private: currentlyArray });
  };

  return (
    <div className="wizard__icon-file edit">
      <span className="preview__label">{intl.formatMessage(previewFiles)}</span>
      {files.length > 0
        ? (
          <ul className="preview__list">
            {files.map((file, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index + file.path + index + 12 + file.path}>
                {index + 1}
                .
                {' '}
                {file.path}
                {' '}
                <i className="icon-trash" onClick={() => removeFile(file)} />

                <div onClick={() => changeTypeFiles(file)}>
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

              </li>
            ))}
          </ul>
        )
        : <p className="wizard__no-files">No Files</p>}
    </div>

  );
};

export default UpdatedFiles;
