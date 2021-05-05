import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
// import togeojson from '@mapbox/togeojson';
import { step2GeoBtn, step2Types } from '../../LangWizardForm';
import CustomBtn from '../../../CustomBtn';

const GeoJsonUploader = ({ coordinate, setCoordinate, state, setState,
  setJsonFile, setShowMap }) => {
  const intl = useIntl();
  const [geoJson, setGeoJson] = useState([]);
  const [myFiles, setMyFiles] = useState([]);
  // const checkTypeFile = (file) => {
  //   const fileread = new FileReader();
  //
  //   console.log(file, 'file');
  //   console.log(file.type === 'application/vnd.google-earth.kml+xml', 'file.type === \'application/vnd.google-earth.kml+xml\'');
  //   if (file.type === 'application/vnd.google-earth.kml+xml') {
  //     fileread.onload = function (e) {
  //       const content = e.target.result;
  //       console.log(content, 'content');
  //
  //       const geo = togeojson.kml(content);
  //       console.log(geo, 'geo');
  //       console.log(content, 'content');
  //     };
  //     fileread.readAsDataURL(file);
  //   }
  // };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles, 'json');
    const fileread = new FileReader();

    fileread.onload = function (e) {
      const content = e.target.result;
      // console.log(content);
      const intern = JSON.parse(content); // Array of Objects.
      setMyFiles([...acceptedFiles]);
      setGeoJson(intern.features.filter((el) => el.geometry.type === 'Polygon'));

      console.log(intern); // You can index every object
    };
    fileread.readAsText(acceptedFiles[0]);
    console.log(geoJson, 'geoJson');
  }, []);
  // eslint-disable-next-line no-unused-vars
  const removeFile = (file) => {
    console.log(file, 'file');
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
    setState({ ...state, geoJson: '' });

    setGeoJson([]);
  };

  useEffect(() => {
    console.log(state.geoJson, 'state.geoJson');

    if (state.geoJson) {
      console.log(state.geoJson.file, 'state.geoJson');

      setMyFiles(state.geoJson.file);
      setGeoJson(state.geoJson.geo);
    }
    if (geoJson.length > 0) {
      const { coordinates } = geoJson[0].geometry;
      const objCoord = {
        longitude: coordinates[0][0][0],
        latitude: coordinates[0][0][1],
      };
      setCoordinate({ ...coordinate, polygon: geoJson, coordinate: objCoord });
      setState({ ...state, geoJson: { file: myFiles, geo: geoJson } });

      setJsonFile({ geoJson: { file: myFiles, geo: geoJson } });
      setShowMap(true);
    } else {
      // setCoordinate(defaultState);
    }
  }, [geoJson]);
  // eslint-disable-next-line no-unused-vars
  const files = myFiles.map((file) => (
    <li className="wizard__code-plus" key={file.path + file.path}>
      {' '}
      {file.path}
      {' '}
    </li>
  ));
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, multiple: false });
  console.log(geoJson, 'geoJson');
  return (
    <div className="wizard__geo-uploader">
      <div {...getRootProps()}>
        {geoJson.length === 0 && (
        <div className="wizard__geo-wrapper">
          <input {...getInputProps()} />

          <CustomBtn label={intl.formatMessage(step2GeoBtn)} type="button" handleClick={() => {}} customClass="btn__map" />
          <div className="wizard__types-file">
            {intl.formatMessage(step2Types)}
          </div>
        </div>
        )}
        {/* { myFiles.length > 0 */}
        {/* && ( */}
        {/*  <div> */}
        {/*    <ul>{files}</ul> */}
        {/*    <CustomBtn label={intl.formatMessage(step2GeoBtn)} type="button" handleClick={() => {}} customClass="btn__map" /> */}

        {/*  </div> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default GeoJsonUploader;
