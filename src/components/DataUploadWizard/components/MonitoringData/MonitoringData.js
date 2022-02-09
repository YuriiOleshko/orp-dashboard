/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { appStore } from 'src/state/app';
import { contractMethods, getContract } from 'src/utils/near-utils';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import { CSVLink } from 'react-csv';
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import Map from 'src/components/WizardForm/Steps/ProjectLocation/Map/Map';
import CustomInput from 'src/generic/CustomInput';
// eslint-disable-next-line import/no-unresolved
import CustomBtn from 'src/generic/CustomBtn';
import GeoJsonUploader from 'src/components/WizardForm/Steps/AnotherComponents/GeoJsonUploader';
import WrapperScaleImg from '../../../WrapperScaleImg/WrapperScaleImg';

const MonitoringData = ({ totalData, setTotalData, nextPage, prevPage, currentStage, handleUpdateProject, editSub, setEditSub }) => {
  const { state } = useContext(appStore);
  const { account } = state;
  const { register, handleSubmit, errors, clearErrors } = useForm();
  const location = useLocation();

  const defaultCoordinate = totalData.coordinate
    ? {
      region: totalData.region,
      polygon: totalData.polygon,
      subZonesPolygon: totalData.subZonesPolygon || [],
      codePlus: totalData.codePlus,
      polygonCoordinate: totalData.polygonCoordinate,
      square: totalData.square,
      coordinate: totalData.coordinate,
    } : { region: '',
      polygon: [],
      subZonesPolygon: totalData.subZonesPolygon || [],
      codePlus: null,
      polygonCoordinate: [],
      square: 0,
      coordinate: { longitude: '', latitude: '' } };
  const [coordinate, setCoordinate] = useState(defaultCoordinate);
  const [showMap, setShowMap] = useState(false);
  const [showSampleMap, setShowSampleMap] = useState(false);
  const [jsonFile, setJsonFile] = useState(totalData.geoJson || '');
  const [subzoneArea, setSubzoneArea] = useState('');
  const [numberSampleZones, setNumberSampleZones] = useState(0);
  const [contractError, setContractError] = useState({});
  const [warning, setWarning] = useState('');
  const intl = useIntl();

  const getValidSquare = (num) => {
    // const oneMillion = 1e6;
    const tenThousands = 1e4;
    let squareMeters = (num * tenThousands).toFixed(3);
    const decimal = squareMeters - Math.floor(squareMeters);
    squareMeters = decimal > 0 ? squareMeters : `${Math.floor(squareMeters)}`;
    return squareMeters;
  };

  const handleClickNext = () => {
    const targetSubZoneIndex = coordinate.subZonesPolygon.findIndex((i) => i?.stage === currentStage);
    if (targetSubZoneIndex >= 0) {
      const currentNumber = coordinate.subZonesPolygon[targetSubZoneIndex].sampleZones.length;
      // if (currentNumber === numberSampleZones) {
      if (currentNumber >= 1) {
        setWarning('');
        setEditSub(false);
        handleUpdateProject(totalData);
        // nextPage();
      } else {
        setWarning("You haven't set the right number of sampling zones!");
      }
    }
  };

  const handleClickReset = () => {
    const targetSubZoneIndex = coordinate.subZonesPolygon.findIndex((i) => i?.stage === currentStage);
    if (targetSubZoneIndex >= 0) {
      const resetedCoordinate = { ...coordinate };
      resetedCoordinate.subZonesPolygon.splice(targetSubZoneIndex, 1);
      setCoordinate(resetedCoordinate);
    }
  };

  useEffect(() => {
    setTotalData({ ...totalData, ...coordinate });
  }, [coordinate]);

  useEffect(async () => {
    if (subzoneArea) {
      const squareMeters = getValidSquare(subzoneArea);
      const contract = getContract(account, contractMethods, 0);
      try {
        const num = await contract.calculate_sample_zones({ project_area: squareMeters });
        setNumberSampleZones(num);
        setContractError({});
      } catch (e) {
        setContractError({ type: 'sample-zones', msg: 'Error, try again!' });
        console.log(e);
      }
    }
  }, [subzoneArea]);

  useEffect(() => {
    const targetSubZoneIndex = coordinate.subZonesPolygon.findIndex((i) => i?.stage === currentStage);
    if (targetSubZoneIndex >= 0) {
      const currentNumber = coordinate.subZonesPolygon[targetSubZoneIndex].sampleZones.length;
      // if (currentNumber === numberSampleZones || currentNumber === 0) {
      if (currentNumber >= 1 || currentNumber === 0) {
        setWarning('');
      } else {
        setWarning("You haven't set the right number of sampling zones!");
      }
    }
  }, [coordinate]);

  useEffect(async () => {
    if (editSub) {
      const subArea = totalData.subZonesPolygon.find((i) => i?.stage === currentStage);
      if (subArea) {
        const squareMeters = getValidSquare(subArea.square);
        const contract = getContract(account, contractMethods, 0);
        try {
          const num = await contract.calculate_sample_zones({ project_area: squareMeters });
          setNumberSampleZones(num);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [editSub]);

  return (
    <div className="upload-wizard__monitoring">
      <div className="upload-wizard__subzone-action">
        <CustomBtn
          label="Draw sub-zone"
          handleClick={() => {
            setJsonFile('');
            setShowMap(true);
          }}
          type="button"
          customClass="btn__cancel upload-wizard__draw"
        />
        <GeoJsonUploader customClass="btn__cancel upload-wizard__upload" currentStage={currentStage} subZones coordinate={coordinate} setCoordinate={setCoordinate} jsonFile={jsonFile} setJsonFile={setJsonFile} setState={setTotalData} state={totalData} setShowMap={setShowMap} />
        {/* <CustomBtn label="Upload File" handleClick={() => {}} type="button" customClass="btn__cancel upload-wizard__upload" /> */}
        <CustomBtn label="Reset" handleClick={handleClickReset} type="button" iconClass="icon-replace" customClass="btn__reset upload-wizard__reset" />
      </div>
      {showMap && <Map currentStage={currentStage} subZones state={coordinate} setState={setCoordinate} setShow={setShowMap} jsonFile={jsonFile} setJsonFile={setJsonFile} intl={intl} clear={clearErrors} setSubzoneArea={setSubzoneArea} contractError={contractError} />}
      {coordinate.subZonesPolygon.length && coordinate.subZonesPolygon[currentStage] ? (
        <div className="upload-wizard__map">
          <WrapperScaleImg cid={coordinate.subZonesPolygon[currentStage].cidSubScreenShot} />
        </div>
      ) : (
        <WrapperScaleImg cid={totalData.cidScreenShot} />
      )}
      {!!coordinate.subZonesPolygon.length && !!coordinate.subZonesPolygon[currentStage] && (
        <div className="upload-wizard__sz">
          {warning && <span className="upload-wizard__sz-warning">{warning}</span>}
          <span className="upload-wizard__sz-header">Sampling Zones</span>
          <p className="upload-wizard__sz-title">
            Place
            {' '}
            {numberSampleZones}
            {' '}
            sampling zones in the monitoring area so you can report on the forestation activities happening there.
          </p>
          <CustomBtn
            label="Place sampling zones"
            handleClick={() => setShowSampleMap(true)}
            iconClass="icon-marker"
            customClass="btn__map btn__map-sampling"
          />
          <div className="upload-wizard__area-info">
            {!!coordinate.subZonesPolygon.length && !!coordinate.subZonesPolygon[currentStage] && (
              <div className="upload-wizard__area">
                <span>Area, Hectares</span>
                <p className="upload-wizard__input-value">{coordinate.subZonesPolygon[currentStage].square}</p>
              </div>
            )}
            {!!coordinate.subZonesPolygon.length
              && !!coordinate.subZonesPolygon[currentStage]
              && !!coordinate.subZonesPolygon[currentStage].sampleZones.length && (
              <div className="upload-wizard__num-zones">
                <span>Number of Sampling Zones</span>
                <p className="upload-wizard__input-value">{coordinate.subZonesPolygon[currentStage].sampleZones.length}</p>
              </div>
            )}
          </div>
          {!!coordinate.subZonesPolygon[currentStage].sampleZones.length && (
            <>
              <WrapperScaleImg cid={coordinate.subZonesPolygon[currentStage].cidSampleScreenShot} />
              <CSVLink
                data={coordinate.subZonesPolygon[currentStage].sampleZones.map((el) => [`longitude: ${el.coordinates[0]}`, `latitude: ${el.coordinates[1]}`])}
                filename="Coordinate"
                className="upload-wizard__sz-download"
              >
                Download Sampling Zones coordinates
              </CSVLink>
            </>
          )}
        </div>
      )}
      {showSampleMap && <Map currentStage={currentStage} sampleZones state={coordinate} setState={setCoordinate} numberSampleZones={numberSampleZones} setShow={setShowSampleMap} intl={intl} clear={clearErrors} />}
      <div className="upload-wizard__panel">
        <CustomBtn
          label="Back"
          handleClick={() => {
            if (editSub) {
              setEditSub(false);
              nextPage();
            } else {
              prevPage();
            }
          }}
          type="button"
          customClass="btn__cancel"
        />
        <CustomBtn
          label={editSub ? 'Edit' : 'Save'}
          handleClick={handleClickNext}
          type="submit"
        />
      </div>
    </div>
  );
};

export default MonitoringData;
