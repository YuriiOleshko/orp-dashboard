import React, { useState, useEffect } from 'react';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import WrapperScaleImg from 'src/components/WrapperScaleImg/WrapperScaleImg';
import PreviewSapmleZone from '../PreviewSampleZone/PreviewSampleZone';
import ModalWindow from '../../../ModalWindow/ModalWindow';
import { initIPFS, getFilesFromDirectory } from '../../../../state/ipfs';

const PreviewReport = ({ prevPage, totalData, currentStage, handleUpdateProject }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [filesNames, setFilesNames] = useState([]);
  const currentSubZone = { ...totalData.subZonesPolygon[currentStage] };
  const sampleZones = [...currentSubZone.sampleZones];
  useEffect(async () => {
    if (currentSubZone.filesCidDir) {
      const ipfs = await initIPFS();
      const updateArray = await (getFilesFromDirectory(ipfs, currentSubZone.filesCidDir));
      setFilesNames(updateArray.map((item) => item.path));
    }
  }, []);

  const confirmDataUpload = () => {
    const dataUploadTime = Date.now();
    const updData = { ...totalData };
    const updCurrentSubzone = { ...currentSubZone, dataUploadTime, finished: true };
    updData.subZonesPolygon[currentStage] = updCurrentSubzone;
    handleUpdateProject(updData);
  };

  return (
    <>
      <div className="upload-wizard__monitoring">
        <div className="upload-wizard__area-info">
          <div className="upload-wizard__area">
            <span>Area, sq. km</span>
            <p className="upload-wizard__input-value">{currentSubZone.square}</p>
          </div>
          <div className="upload-wizard__num-zones">
            <span>Number of Sample zones</span>
            <p className="upload-wizard__input-value">{sampleZones.length}</p>
          </div>
        </div>
        <div className="upload-wizard__preview-map">
          {/* <span>Point 3 places on the map to define Sample zones for reporting in this Stage</span>
          <img src={map} alt="map" />
          <span className="upload-wizard__preview-link">Download Sample zones coordinates</span> */}
        </div>
        <WrapperScaleImg cid={currentSubZone.cidSampleScreenShot} />
      </div>
      <form>
        <div className="upload-wizard__sz-list">
          {sampleZones.map((zone) => (
            <PreviewSapmleZone
              sampleName={zone.sampleName}
              coordinates={zone.coordinates}
              sampleTrees={zone.sampleTrees}
              key={`${zone.sampleName}${zone.index}`}
            />
          ))}
        </div>
        <div className="upload-preview_documents">
          {!!filesNames.length && (
          <div className="upload-preview_documents_wrap">
            <h4>Uploaded Stage Report</h4>
            {filesNames.reverse().map((item, index) => <span className="upload-preview_documents_wrap-img" key={item}>{`${index + 1}. ${item}`}</span>)}
          </div>
          )}
          {!!currentSubZone.additional && (
            <div className="upload-preview_documents_wrap">
              <h4>Additional Comments</h4>
              <span className="upload-preview_documents_wrap-coments">{currentSubZone.additional}</span>
            </div>
          )}
        </div>
        <div className="upload-wizard__panel">
          <CustomBtn label="Back" handleClick={prevPage} type="button" customClass="btn__cancel" />
          <CustomBtn
            label="Next"
            handleClick={() => { setDisplayModal(!displayModal); }}
          />
        </div>
      </form>
      <ModalWindow displayModal={displayModal} setDisplayModal={setDisplayModal} confirmDataUpload={confirmDataUpload} />
    </>
  );
};

export default PreviewReport;
