/* eslint-disable */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import togeojson from '@mapbox/togeojson';
import CustomBtn from 'src/generic/CustomBtn';
var shapefile = require("shapefile");
import { step2GeoBtn, step2Types } from '../../LangWizardForm';

const acceptType = ['7b202274', '3c3f786d', '504b34', '0027a'];

const GeoJsonUploader = ({ coordinate, setCoordinate, state, setState,
  setJsonFile, setShowMap, currentStage, subZones, customClass }) => {
  const intl = useIntl();
  const [geoJson, setGeoJson] = useState([]);
  const [myFiles, setMyFiles] = useState([]);

  const getDom = (xml) => (new DOMParser()).parseFromString(xml, 'text/xml');
  const getExtension = (fileName) => fileName.split('.').pop();

  const getKmlDom = (kmzFile) => {
    const jsZip = new JSZip();
    return jsZip.loadAsync(kmzFile).then((zip) => {
      let kmlDom = null;
      zip.forEach((relPath, file) => {
        if (getExtension(relPath) === 'kml' && kmlDom === null) {
          kmlDom = file.async('string').then(getDom);
        }
      });
      return kmlDom || Promise.reject("No kml file found");
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const fileread = new FileReader();
    const filereadBuff = new FileReader();
    if (acceptedFiles.length <= 0) return false;
    fileread.onload = async function (e) {
      const content = e.target.result;
      let intern;
      if (acceptedFiles[0].codeType === '0027a') {
        return;
      } else if (acceptedFiles[0].codeType === '504b34') {
        const kmlDom = await getKmlDom(acceptedFiles[0]);
        const geo = togeojson.kml(kmlDom);
        intern = geo; // Array of Objects.
      } else if (acceptedFiles[0].codeType === '3c3f786d') {
        const dom = new DOMParser().parseFromString(content, 'text/xml');
        const geo = togeojson.kml(dom);
        intern = geo; // Array of Objects.
      } else intern = JSON.parse(content); // Array of Objects.
      const newDataInter = intern.features.find((el) => el.geometry.type === 'Polygon');
      setMyFiles([...acceptedFiles]);
      if (newDataInter) setGeoJson([newDataInter]);
    };
    filereadBuff.onload = async function (e) {
      if (acceptedFiles[0].codeType === '0027a') {
        shapefile.open(e.target.result)
        .then(source => source.read()
          .then(function log(result) {
            if (result.done) return;
            const newDataInter = result.value.geometry.type === 'Polygon' && result.value;
            setMyFiles([...acceptedFiles]);
            if (newDataInter) setGeoJson([newDataInter]);
          }))
        .catch(error => console.error(error.stack));
      }
    };
    filereadBuff.readAsArrayBuffer(acceptedFiles[0]);
    fileread.readAsText(acceptedFiles[0]);
  }, []);
  // eslint-disable-next-line no-unused-vars
  const removeFile = (file) => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    setState({ ...state, geoJson: '' });
    setGeoJson([]);
  };

  useEffect(() => {
    // if (state.geoJson) {
    //   console.log(state.geoJson.file, 'state.geoJson');
    //
    //   setMyFiles(state.geoJson.file);
    //   setGeoJson(state.geoJson.geo);
    // }
    if (geoJson.length > 0) {
      const { coordinates } = geoJson[0].geometry;
      const objCoord = {
        longitude: coordinates[0][0][0],
        latitude: coordinates[0][0][1],
        zoom: (coordinates[0][0][2] || 5),
      };
      if (subZones) {
        const copySubZones = [...coordinate.subZonesPolygon];
        if (!geoJson[0].id) geoJson[0].id = `${Date.now()}`;
        copySubZones[currentStage] = { ...coordinate, polygon: geoJson, coordinate: objCoord, sampleZones: [], stage: currentStage };
        setCoordinate({ ...coordinate, subZonesPolygon: copySubZones });
        setState({ ...state, ...coordinate, subZonesPolygon: copySubZones });
        setJsonFile({ geoJson: { file: myFiles, geo: geoJson } });
      } else {
        setCoordinate({ ...coordinate, polygon: geoJson, coordinate: objCoord });
        setState({ ...state, geoJson: { file: myFiles, geo: geoJson } });
        setJsonFile({ geoJson: { file: myFiles, geo: geoJson } });
      }
      setShowMap(true);
    }
    // else {
    //   // setCoordinate(defaultState);
    // }
  }, [geoJson]);

  const checkAcceptTypes = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      file.codeType = header;
      if (acceptType.includes(header)) {
        return null;
      }
      return {
        code: 'unsuitable file type',
        message: '.geojson, .kml, .kmz, .shp',
      };
    };
    fileReader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, multiple: false, maxSize: 1e+7, validator: checkAcceptTypes });
  return (
    <div className="wizard__geo-uploader">
      <div {...getRootProps()}>
        <div className="wizard__geo-wrapper">
          <input {...getInputProps()} />
          <CustomBtn label={intl.formatMessage(step2GeoBtn)} type="button" handleClick={() => {}} customClass={`btn__map ${customClass}`} />
          <div className="wizard__types-file">
            Make sure that the coordinate system is WGS 84
          </div>
          <div className="wizard__types-file">
            {intl.formatMessage(step2Types)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoJsonUploader;
