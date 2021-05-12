import React, {
  useState, useEffect, useRef,
} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import area from '@turf/area';
import centerOfMass from '@turf/center-of-mass';
import html2canvas from 'html2canvas';
// import Canvas2Image from 'canvas2image-2';
import API from '../../api/api-map';
import olc from '../../utils/openlocal';
import CustomBtn from '../CustomBtn';
import { wizardBtnBack } from '../WizardForm/LangWizardForm';
import { initIPFS } from '../../state/ipfs';

const Map = ({ state, setState, setShow, intl, clear, setShowPrev }) => {
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
        const ipfs = await initIPFS();
        const res = await ipfs.add(blob);
        const updDatePolygon = { ...datePolygon, cidScreenShot: res.path };
        setDataPolygon(updDatePolygon);
        setLoadingIPfs(true);
        setLoadingMap(false);
        // console.log('SAVE MAP TO IPFS -------------->', res);
      }, 'canvas.toBlob');
    });
  };
  useEffect(() => {
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
          polygon: true,
          trash: true,
        },
      });

      map.addControl(draw);
      // eslint-disable-next-line no-use-before-define
      map.on('draw.create', updateArea);
      // eslint-disable-next-line no-use-before-define
      map.on('draw.delete', updateArea);
      // eslint-disable-next-line no-use-before-define
      map.on('draw.update', updateArea);

      if (state.polygon.length > 0) {
        draw.add(state.polygon[0]);
        setCoord({ longitude: state.coordinate.longitude, latitude: state.coordinate.latitude, zoom: state.coordinate.zoom });

        // eslint-disable-next-line no-use-before-define
        updateArea(state.polygon[0], true);
      }
      async function updateArea(e, update = false) {
        const features = update ? e : e.features[0];
        const data = draw.getAll();
        const center = centerOfMass(features).geometry.coordinates;
        const place = await API.getInfoForMap(center[1], center[0]);
        let placeName;
        if (place.features.length > 0)placeName = place.features[0].place_name;
        else placeName = 'Not Found';
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
    };
    let coordinate;
    if (state.polygon.length > 0) {
      console.log({ longitude: state.coordinate.longitude, latitude: state.coordinate.latitude, zoom: state.coordinate.zoom }, '{ lng: state.coordinate.longitude, lat: state.coordinate.latitude, zoom: state.coordinate.zoom }');
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
      setShowPrev(false);
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
          <p>Draw a polygon using the draw tools.</p>
          {datePolygon.square > 0 && (
            <div className="map__inside-block">
              <span>Square Meters</span>
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
        </div>

      </div>
    </div>
  );
};

export default Map;
