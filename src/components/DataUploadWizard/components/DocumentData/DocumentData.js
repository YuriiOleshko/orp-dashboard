/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactTooltip from 'react-tooltip';
import { ReactSVG } from 'react-svg';
import NumberFormat from 'react-number-format';
import CustomBtn from 'src/generic/CustomBtn';
import CustomInput from 'src/generic/CustomInput';
import DropzoneInput from 'src/components/Dropzone';
import Benefits from 'src/components/Benefits';
import bubble from 'src/assets/image/wizard/buble.svg';
import ModalWindow from '../../../ModalWindow';

const DocumentData = ({ nextPage, prevPage, totalData, setTotalData, currentStage, globalFiles, setGlobalFiles, globalCidFiles, setGlobalCidFiles, handleUpdateProject }) => {
  const currentSubZone = { ...totalData.subZonesPolygon[currentStage] };
  const { register, handleSubmit, errors, control } = useForm();
  const [files, setFiles] = useState(globalCidFiles);
  const [additional, setAdditional] = useState(currentSubZone.additional ? { additional: currentSubZone.additional } : {});
  const [filesSave, setFilesSave] = useState([]);
  const [myFiles, setMyFiles] = useState(globalFiles);
  const [displayModal, setDisplayModal] = useState(false);
  const onSubmit = (modal) => {
    if (files.filesCidDir) {
      const updZone = [...totalData.subZonesPolygon];
      const targetSubZone = updZone.pop();
      targetSubZone.filesCidDir = files.filesCidDir;
      updZone.push(targetSubZone);
      setTotalData({ ...totalData, subZonesPolygon: updZone });
    }
    const updZone = [...totalData.subZonesPolygon];
    const targetSubZone = updZone.pop();
    targetSubZone.additional = additional.additional || '';
    updZone.push(targetSubZone);
    setTotalData({ ...totalData, subZonesPolygon: updZone });
    if (modal) setDisplayModal(true);
    // nextPage();
  };

  const confirmDataUpload = () => {
    const dataUploadTime = Date.now();
    const updData = { ...totalData };
    const updCurrentSubzone = { ...currentSubZone, dataUploadTime, finished: true };
    updData.subZonesPolygon[currentStage] = updCurrentSubzone;
    handleUpdateProject(updData);
  };

  useEffect(() => {
    setGlobalFiles(myFiles);
  }, [myFiles]);

  useEffect(() => {
    setGlobalCidFiles({ filesCidDir: files.filesCidDir });
  }, [files]);

  return (
    <>
      <form onSubmit={handleSubmit(() => onSubmit(true))}>
        <div className="wizard__wrapper-form upload-wizard__wrapper-form">
          <div className="wizard__icon-file">
            <div className="wizard__wrapper-tooltip">
              <span className="input__label">Add Documents</span>
            </div>
            <DropzoneInput
              classCutom=""
              change={setFiles}
              multi
              amountFiles={10}
              state={totalData}
              filesSave={filesSave}
              setFilesSave={setFilesSave}
              myFiles={myFiles}
              setMyFiles={setMyFiles}
              acceptedFileTypes=".pdf, .txt, .doc, .jpeg, .jpg, .png"
              showFileStatus={false}
            />
          </div>
          <div className="wizard__textarea">
            <label className="input__label ">Additional Comments</label>
            <textarea name="GenInfo" placeholder="Type here" ref={register({ required: true })} onChange={(ev) => setAdditional({ additional: ev.target.value })} defaultValue={additional.additional} />
            {errors.GenInfo && <div className="input__error">This is required</div>}
          </div>
        </div>
        <div className="upload-wizard__panel upload-wizard__panel-document">
          <CustomBtn
            label="Back"
            handleClick={prevPage}
            type="button"
            customClass="btn__cancel"
          />
          <CustomBtn
            label="Preview Report"
            handleClick={() => { nextPage(); onSubmit(false); }}
            customClass="btn__cancel"
          />
          <CustomBtn
            label="Submit Report"
            handleClick={() => { }}
            type="submit"
            customClass="btn__submit-report"
          />
        </div>
      </form>
      <ModalWindow displayModal={displayModal} setDisplayModal={setDisplayModal} confirmDataUpload={confirmDataUpload} />
    </>
  );
};

export default DocumentData;
