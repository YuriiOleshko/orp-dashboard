import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { step2GeoBtn } from '../../LangWizardForm';

// const defaultState = { region: '',
//   polygon: [],
//   codePlus: null,
//   polygonCoordinate: [],
//   square: 0,
//   coordinate: { longitude: '', latitude: '' } };
// eslint-disable-next-line no-unused-vars
const GeoJsonUploader = ({ coordinate, setCoordinate, jsonFile, state, setState,
  setJsonFile }) => {
  const intl = useIntl();
  const [geoJson, setGeoJson] = useState([]);
  const [myFiles, setMyFiles] = useState([]);

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
    } else {
      // setCoordinate(defaultState);
    }
  }, [geoJson]);
  const files = myFiles.map((file, index) => (
    <li key={file.path + file.path}>
      {index + 1}
      .
      {' '}
      {file.path}
      {' '}
      <i className="icon-trash" onClick={() => removeFile(file)} />
    </li>
  ));
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, multiple: false });
  console.log(geoJson, 'geoJson');
  return (
    <div className="wizard__geo-uploader">
      <div {...getRootProps()}>
        {geoJson.length === 0 && (
        <div className="wizard__creator-wrapper">
          <input {...getInputProps()} />

          <i className="icon-plus-cir" />
          <span>{intl.formatMessage(step2GeoBtn)}</span>
        </div>
        )}
        { myFiles.length > 0
        && (
          <aside>
            <ul>{files}</ul>
          </aside>
        )}
      </div>
    </div>
  );
};

export default GeoJsonUploader;
