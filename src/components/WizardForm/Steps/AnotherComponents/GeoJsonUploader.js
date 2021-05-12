import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import togeojson from '@mapbox/togeojson';
import { step2GeoBtn, step2Types } from '../../LangWizardForm';
import CustomBtn from '../../../CustomBtn';

const acceptType = ['json', 'kml'];

const GeoJsonUploader = ({ coordinate, setCoordinate, state, setState,
  setJsonFile, setShowMap }) => {
  const intl = useIntl();
  const [geoJson, setGeoJson] = useState([]);
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const fileread = new FileReader();
    if (acceptedFiles.length <= 0) return false;
    fileread.onload = function (e) {
      const content = e.target.result;
      let intern;
      // console.log(contDom, 'sho');
      if (acceptedFiles[0].type === 'application/vnd.google-earth.kml+xml') {
        const dom = new DOMParser().parseFromString(content, 'text/xml');
        const geo = togeojson.kml(dom);
        intern = geo; // Array of Objects.
      } else intern = JSON.parse(content); // Array of Objects.

      setMyFiles([...acceptedFiles]);
      setGeoJson([intern.features.find((el) => el.geometry.type === 'Polygon')]);
    };
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
      setCoordinate({ ...coordinate, polygon: geoJson, coordinate: objCoord });
      setState({ ...state, geoJson: { file: myFiles, geo: geoJson } });
      setJsonFile({ geoJson: { file: myFiles, geo: geoJson } });
      setShowMap(true);
    }
    // else {
    //   // setCoordinate(defaultState);
    // }
  }, [geoJson]);

  const checkAcceptTypes = (file) => {
    const pathAsArray = file.path.split('.');
    if (acceptType.includes(pathAsArray[pathAsArray.length - 1])) {
      return null;
    }
    return {
      code: 'unsuitable file type',
      message: '.geojson, .kml, .shp (files accepted) ',
    };
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, multiple: false, maxSize: 1e+7, validator: checkAcceptTypes });
  return (
    <div className="wizard__geo-uploader">
      <div {...getRootProps()}>
        <div className="wizard__geo-wrapper">
          <input {...getInputProps()} />
          <CustomBtn label={intl.formatMessage(step2GeoBtn)} type="button" handleClick={() => {}} customClass="btn__map" />
          <div className="wizard__types-file">
            {intl.formatMessage(step2Types)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoJsonUploader;
