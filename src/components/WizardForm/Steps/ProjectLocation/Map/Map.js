/* eslint-disable no-unused-vars */
/* eslint-disable */
import React, {
  useState, useEffect, useRef,
} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import defaultTheme from '@mapbox/mapbox-gl-draw/src/lib/theme';
import area from '@turf/area';
import centerOfMass from '@turf/center-of-mass';
import html2canvas from 'html2canvas';
// import Canvas2Image from 'canvas2image-2';
import API from '../../../../../api/api-map';
import olc from '../../../../../utils/openlocal';
import CustomBtn from '../../../../../generic/CustomBtn';
import { wizardBtnBack } from '../../../LangWizardForm';
import { initIPFS } from '../../../../../state/ipfs';

const Map = ({ state, setState, setShow, intl, clear, setShowPrev, initZone, subZones, sampleZones, currentStage, jsonFile, setJsonFile, setSubzoneArea, numberSampleZones }) => {
  const [map, setMap] = useState(null);
  const [loadingIPfs, setLoadingIPfs] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [datePolygon, setDataPolygon] = useState({ region: '',
    polygon: [],
    codePlus: null,
    polygonCoordinate: [],
    square: 0,
    coordinate: { longitude: '', latitude: '' } });
  const [coord, setCoord] = useState({
    longitude: 5,
    latitude: 34,
    zoom: 2,
  });
  const mapContainer = useRef(null);
  const screen = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const printImg = () => {
    setLoadingMap(true);
    html2canvas(mapContainer.current, {
      useCORS: true,
      removeContainer: false,
      x: 0,
      y: 0,
      scrollY: -61,
    }).then(async (canvas) => {
      canvas.toBlob(async (blob) => {
        try {
          const ipfs = await initIPFS();
          const res = await ipfs.add(blob);
          if (subZones) {
            const updSubZone = [...datePolygon.subZonesPolygon];
            const targetSubZone = updSubZone.pop();
            targetSubZone.cidSubScreenShot = `/ipfs/${res.path}`;
            updSubZone.push(targetSubZone);
            setDataPolygon({ ...datePolygon, subZonesPolygon: updSubZone });
            setLoadingIPfs(true);
            setLoadingMap(false);
          }
          if (sampleZones) {
            const updSubZone = [...datePolygon.subZonesPolygon];
            const targetSubZone = updSubZone.pop();
            targetSubZone.cidSampleScreenShot = `/ipfs/${res.path}`;
            updSubZone.push(targetSubZone);
            setDataPolygon({ ...datePolygon, subZonesPolygon: updSubZone });
            setLoadingIPfs(true);
            setLoadingMap(false);
          }
          if (initZone) {
            const updDatePolygon = { ...datePolygon, cidScreenShot: `/ipfs/${res.path}` };
            setDataPolygon(updDatePolygon);
            setLoadingIPfs(true);
            setLoadingMap(false);
            // console.log('SAVE MAP TO IPFS -------------->', res);
          }
        } catch (_) {
          setLoadingMap(true);
        }
      }, 'canvas.toBlob');
    });
  };
  useEffect(() => {
    // Temporary variable to save state with updated coordinates after event listener will be finished (closure)
    let copyCoordinate = { ...state };
    mapboxgl.accessToken = process.env.REACT_APP_MAP_KEY;
    // eslint-disable-next-line no-shadow
    const initializeMap = ({ setMap, mapContainer, coordinate }) => {
      // eslint-disable-next-line no-shadow
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container id
        style: 'mapbox://styles/mapbox/satellite-v9', // hosted style id
        center: [coordinate.longitude, coordinate.latitude], // starting position
        zoom: 0,
        preserveDrawingBuffer: true,
      });

      function rotate() {
        map.flyTo({ center: [coordinate.longitude, coordinate.latitude], zoom: (coordinate.zoom || 3) });
      }

      map.on('load', () => {
        setMap(map);
        map.resize();
        rotate();
      });

      map.on('move', () => {
        setCoord({
          longitude: map.getCenter().lng.toFixed(4),
          latitude: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });

      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: initZone || subZones,
          trash: true,
          point: sampleZones,
        },
        userProperties: true,
        styles: [
          ...defaultTheme,
          {
            'id': 'focused-point-circle',
            'type': 'circle',
            'filter': ['all',
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature'],
              ['==', 'active', 'true']],
            'paint': {
              'circle-radius': 11,
              'circle-color': '#2EC3E9'
            }
          },
          {
            'id': 'blured-point-circle',
            'type': 'circle',
            'filter': ['all',
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature'],
              ['==', 'active', 'false']],
            'paint': {
              'circle-radius': 9,
              'circle-color': '#FFFFFF'
            }
          },
          {
            'id': 'point-label',
            'type': 'symbol',
            'filter': ['all',
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature']],
            'paint': {
              'text-color': '#FFFFFF',
            },
            'layout': {
              'text-field': ['case',
                ['has', 'sampleName'],
                ['get', 'sampleName'],
                ['get', 'user_sampleName']],
              'text-size': 16,
              'text-offset': [1.5, 0],
              'text-font': ['Lato Bold'],
              'text-allow-overlap': true,
              'text-anchor': 'center',
            },
          },
        ],
      });

      map.addControl(draw);
      // eslint-disable-next-line no-use-before-define
      map.on('draw.create', updateArea);
      // eslint-disable-next-line no-use-before-define
      map.on('draw.delete', updateArea);
      // eslint-disable-next-line no-use-before-define
      map.on('draw.update', updateArea);

      if (state.polygon.length > 0) {
        if (initZone) {
          draw.add(state.polygon[0]);
          // eslint-disable-next-line no-use-before-define
          updateArea(state.polygon[0], true);
        }
        if (subZones && state.subZonesPolygon) {
          draw.add(state.polygon[0]);
          state.subZonesPolygon.forEach((item) => {
            draw.add(item.polygon[0]);
          });
          if (state.subZonesPolygon.length && jsonFile) {
            // eslint-disable-next-line no-use-before-define
            updateArea(state.subZonesPolygon[currentStage].polygon[0], true, true);
            setJsonFile('');
          }
        }
        if (sampleZones && state.subZonesPolygon) {
          const targetSubZoneIndex = state.subZonesPolygon.findIndex((item) => item.stage === currentStage);
          if (targetSubZoneIndex >= 0) {
            draw.add(state.subZonesPolygon[targetSubZoneIndex].polygon[0]);
            state.subZonesPolygon[targetSubZoneIndex].sampleZones.forEach((item) => {
              draw.add(item);
            });
          }
          // eslint-disable-next-line no-use-before-define
          // if (state.subZonesPolygon[0].sampleZones.length) updateArea(state.subZonesPolygon[0].sampleZones[0], true);
        }
        setCoord({ longitude: state.coordinate.longitude, latitude: state.coordinate.latitude, zoom: state.coordinate.zoom });
      }
      async function updateArea(e, update = false, geo = false) {
        const features = update ? e : e.features[0];
        const data = draw.getAll();
        // const targetData = draw.get(data.features[data.features.length - 1].id);
        const center = centerOfMass(features).geometry.coordinates;
        const place = await API.getInfoForMap(center[1], center[0]);
        let placeName;
        if (place.features.length > 0)placeName = place.features[0].place_name;
        else placeName = 'Not Found';
        if (subZones) {
          // If drawing subzone only
          if (data.features.length > currentStage + 2) {
            if (e.type === 'draw.create') {
              draw.delete(features.id);
              return false;
            }
          }
          // Disable editing of project initiation polygon
          if (features.id === state.polygon[0].id) {
            draw.deleteAll();
            draw.add(state.polygon[0]);
            copyCoordinate?.subZonesPolygon.forEach((item) => {
              draw.add(item.polygon[0]);
            });
            return false;
          }
          if (data.features.length > 1) {
            const areaData = area(features);
            const roundedArea = (Math.round(areaData * 100) / 100 / 1000000).toFixed(3);
            // If subzone polygon was added as kml or geoJson file
            if (geo) {
              const copySubZones = [...state.subZonesPolygon];
              copySubZones[currentStage] = {
                stage: currentStage,
                polygon: [features],
                polygonCoordinate: features.geometry.coordinates,
                codePlus: olc.encode(center[1], center[0]),
                square: roundedArea,
                coordinate: { longitude: center[0], latitude: center[1], zoom: coordinate.zoom },
                sampleZones: [],
              };
              setState({ ...state, subZonesPolygon: copySubZones });
              setDataPolygon({ ...state, subZonesPolygon: copySubZones });
              setSubzoneArea(roundedArea);
              copyCoordinate = { ...state, subZonesPolygon: copySubZones };
            }
            switch (e.type) {
              case 'draw.create':
                const updZone = [...state.subZonesPolygon];
                updZone[currentStage] = {
                  stage: currentStage,
                  polygon: [features],
                  polygonCoordinate: features.geometry.coordinates,
                  codePlus: olc.encode(center[1], center[0]),
                  square: roundedArea,
                  coordinate: { longitude: center[0], latitude: center[1], zoom: coordinate.zoom },
                  sampleZones: [],
                };
                // updZone.push({
                //   stage: currentStage,
                //   polygon: [features],
                //   polygonCoordinate: features.geometry.coordinates,
                //   codePlus: olc.encode(center[1], center[0]),
                //   square: roundedArea,
                //   coordinate: { longitude: center[0], latitude: center[1], zoom: coordinate.zoom },
                //   sampleZones: [],
                // });
                setState({ ...state, subZonesPolygon: updZone });
                setDataPolygon({ ...state, subZonesPolygon: updZone });
                setSubzoneArea(roundedArea);
                copyCoordinate = { ...state, subZonesPolygon: updZone };
                return;
              case 'draw.update':
                const updSubZone = [...state.subZonesPolygon];
                updSubZone.pop();
                updSubZone.push({
                  stage: currentStage,
                  polygon: [features],
                  polygonCoordinate: features.geometry.coordinates,
                  codePlus: olc.encode(center[1], center[0]),
                  square: roundedArea,
                  coordinate: { longitude: center[0], latitude: center[1], zoom: coordinate.zoom },
                  sampleZones: [],
                });
                setState({ ...state, subZonesPolygon: updSubZone });
                setDataPolygon({ ...state, subZonesPolygon: updSubZone });
                setSubzoneArea(roundedArea);
                copyCoordinate = { ...state, subZonesPolygon: updSubZone };
                return;
              case 'draw.delete':
                const updSubzone = [...state.subZonesPolygon];
                updSubzone.pop();
                setState({ ...state, subZonesPolygon: updSubzone });
                setDataPolygon({ ...state, subZonesPolygon: updSubzone });
                copyCoordinate = { ...state, subZonesPolygon: updSubzone };
                return;
              default:
                return;
            }
          } else {
            setDataPolygon({ ...state, subZonesPolygon: [] });
            setState({ ...state, subZonesPolygon: [] });
            copyCoordinate = { ...state, subZonesPolygon: [] };
          }
        }
        if (sampleZones) {
          // If drawing sample zones
          if (data.features.length > numberSampleZones + 1) {
            draw.delete(features.id);
            return false;
          }
          // Disable editing of subzone polygon when sample zones are added
          if (features.id === state.subZonesPolygon[currentStage].polygon[0].id) {
            draw.deleteAll();
            draw.add(state.subZonesPolygon[currentStage].polygon[0]);
            copyCoordinate.subZonesPolygon[currentStage].sampleZones.forEach((item) => {
              draw.add(item);
            });
            return false;
          }
          if (data.features.length > 1) {
            switch (e.type) {
              case 'draw.create':
                const updZone = [...state.subZonesPolygon];
                const targetSubZone = updZone.pop();
                features.properties.sampleName = `S${targetSubZone.sampleZones.length + 1}`;
                draw.setFeatureProperty(features.id, 'sampleName', `S${targetSubZone.sampleZones.length + 1}`);
                targetSubZone.sampleZones.push({
                  ...features,
                  sampleName: `S${targetSubZone.sampleZones.length + 1}`,
                  coordinates: features.geometry.coordinates,
                  sampleTrees: [],
                });
                updZone.push(targetSubZone);
                setState({ ...state, subZonesPolygon: updZone });
                setDataPolygon({ ...state, subZonesPolygon: updZone });
                copyCoordinate = { ...state, subZonesPolygon: updZone };
                draw.add(features);
                break;
              case 'draw.update':
                const updSubZone = [...state.subZonesPolygon];
                const targetSub = updSubZone.pop();
                const targetSubIndex = targetSub.sampleZones.findIndex((item) => item.id === features.id);
                targetSub.sampleZones.splice(targetSubIndex, 1, {
                  ...features,
                  sampleName: targetSub.sampleZones[targetSubIndex].sampleName,
                  coordinates: features.geometry.coordinates,
                  sampleTrees: [],
                });
                updSubZone.push(targetSub);
                setState({ ...state, subZonesPolygon: updSubZone });
                setDataPolygon({ ...state, subZonesPolygon: updSubZone });
                copyCoordinate = { ...state, subZonesPolygon: updSubZone };
                break;
              case 'draw.delete':
                const updSubzone = [...state.subZonesPolygon];
                const targetSubzone = updSubzone.pop();
                const targetSubindex = targetSubzone.sampleZones.findIndex((item) => item.id === features.id);
                targetSubzone.sampleZones.splice(targetSubindex, 1);
                const renamedSample = targetSubzone.sampleZones.map((item, index) => {
                  item.properties.sampleName = `S${index + 1}`;
                  draw.setFeatureProperty(item.id, 'sampleName', `S${index + 1}`);
                  draw.add(item);
                  return { ...item, sampleName: `S${index + 1}` }
                });
                targetSubzone.sampleZones = [...renamedSample];
                updSubzone.push(targetSubzone);
                setState({ ...state, subZonesPolygon: updSubzone });
                setDataPolygon({ ...state, subZonesPolygon: updSubzone });
                copyCoordinate = { ...state, subZonesPolygon: updSubzone };
                break;
              default:
                break;
            }
          } else {
            const updSubZone = [...state.subZonesPolygon];
            const targetSub = updSubZone.pop();
            targetSub.sampleZones = [];
            updSubZone.push(targetSub);
            setDataPolygon({ ...state, subZonesPolygon: updSubZone });
            setState({ ...state, subZonesPolygon: updSubZone });
            copyCoordinate = { ...state, subZonesPolygon: updSubZone };
          }
        }
        if (initZone) {
          // Project initiation map
          if (data.features.length > 1) {
            draw.delete(features.id);
            return false;
          }
          if (data.features.length > 0) {
            const areaData = area(data);
            const roundedArea = (Math.round(areaData * 100) / 100 / 1000000).toFixed(3);
            setDataPolygon({
              region: placeName,
              polygon: data.features,
              polygonCoordinate: features.geometry.coordinates,
              codePlus: olc.encode(center[1], center[0]),
              square: roundedArea,
              coordinate: { longitude: center[0], latitude: center[1], zoom: coordinate.zoom },
            });
            setState({
              region: placeName,
              polygon: data.features,
              codePlus: olc.encode(center[1], center[0]),
              square: roundedArea,
              polygonCoordinate: features.geometry.coordinates,
              coordinate: { longitude: center[0], latitude: center[1], zoom: coordinate.zoom },
            });
          } else {
            setDataPolygon({
              region: '',
              polygon: [],
              codePlus: null,
              square: 0,
              polygonCoordinate: [],
              coordinate: { longitude: 0, latitude: 0, zoom: 0 },
            });
            setState({
              region: '',
              polygon: [],
              polygonCoordinate: [],
              codePlus: null,
              square: 0,
              coordinate: { longitude: '', latitude: '', zoom: 0 },
            });

          // if (e.type !== 'draw.delete') alert('Use the draw tools to draw a polygon!');
          }
        }
      }
    };
    let coordinate;
    if (state.polygon.length > 0) {
      coordinate = { longitude: state.coordinate.longitude, latitude: state.coordinate.latitude, zoom: state.coordinate.zoom };
      setCoord({ longitude: state.coordinate.longitude, latitude: state.coordinate.latitude, zoom: state.coordinate.zoom });
    } else {
      setCoord(coord);
      coordinate = coord;
    }
    if (!map) initializeMap({ setMap, mapContainer, coordinate });
  }, [map]);

  const uploadStateCoordinate = async () => {
    printImg();
  };

  useEffect(() => {
    if (loadingIPfs) {
      clear(['latitude', 'region', 'longitude']);
      const newData = { ...datePolygon, coordinate: { ...coord } };

      setState(newData);
      setShow(false);
      if (setShowPrev) setShowPrev(false);
    }
  }, [loadingIPfs]);
  // const customClass = show ? 'active' : '';

  return (
    <div className="map" ref={screen}>
      {loadingMap && (
      <p className="map__loading">
        <i className="icon-shield" />
        Sending data to IPFS...
      </p>
      )}
      <div className="map__box">
        <div className="map__box-info">
          <div>
            Longitude:
            {coord.longitude}
            {' '}
            | Latitude:
            {coord.latitude}
            {' '}
            | Zoom:
            {coord.zoom}
          </div>
          <div className="map__btn-wrapper">
            <CustomBtn label={intl.formatMessage(wizardBtnBack)} handleClick={() => setShow(false)} type="button" customClass="btn__cancel" />
          </div>

        </div>
        <div ref={(el) => (mapContainer.current = el)} className="map__map" />
        <div className="map__calculation-box">
          {initZone && <p>Draw a polygon using the draw tools.</p>}
          {subZones && <p>Draw a polygon inside marked area using the draw tools.</p>}
          {sampleZones && <p>Point 3 places on the map using point tool.</p>}
          {initZone && datePolygon.square > 0 && (
            <div className="map__inside-block">
              <span>Square kilometers</span>
              <span>{datePolygon.square}</span>
              <span>Region</span>
              <span>{datePolygon.region}</span>
              <span>Code Plus</span>
              <span>{datePolygon.codePlus}</span>
              <div className="map__btn-wrapper">
                <CustomBtn label="Upload Data" handleClick={() => uploadStateCoordinate()} />
              </div>
            </div>
          )}
          {subZones && !!datePolygon.subZonesPolygon?.length && (
            <div className="map__inside-block">
              <span>Square kilometers</span>
              <span>{datePolygon.subZonesPolygon[datePolygon.subZonesPolygon.length - 1].square}</span>
              <span>Region</span>
              <span>{datePolygon.region}</span>
              <span>Code Plus</span>
              <span>{datePolygon.codePlus}</span>
              <div className="map__btn-wrapper">
                <CustomBtn label="Upload Data" handleClick={() => uploadStateCoordinate()} />
              </div>
            </div>
          )}
          {sampleZones && !!datePolygon.subZonesPolygon && !!datePolygon.subZonesPolygon[currentStage].sampleZones.length && (
            <div className="map__inside-block">
              <div className="map__btn-wrapper">
                <CustomBtn label="Upload Data" handleClick={() => uploadStateCoordinate()} />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Map;
