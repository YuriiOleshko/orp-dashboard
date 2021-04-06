import React, {
  useState, useEffect, useRef,
} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import area from '@turf/area';
import centerOfMass from '@turf/center-of-mass';
import API from '../../api/api-map';
import olc from '../../utils/openlocal';
import CustomBtn from '../CustomBtn';
import { wizardBtnBack } from '../WizardForm/LangWizardForm';

// const styles = {
//   width: '100vw',
//   height: 'calc(100vh - 140px)',
//   position: 'absolute',
//   left: 0,
// };

// eslint-disable-next-line no-unused-vars
const Map = ({ state, setState, setShow, show, intl, clear }) => {
  const [map, setMap] = useState(null);
  const [datePolygon, setDataPolygon] = useState({ region: '',
    polygon: [],
    codePlus: null,
    polygonCoordinate: [],
    square: 0,
    coordinate: { longitude: '', latitude: '' } });
  const [coord, setCoord] = useState({
    lng: 5,
    lat: 34,
    zoom: 2,
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_KEY;
    // eslint-disable-next-line no-shadow
    const initializeMap = ({ setMap, mapContainer }) => {
      // eslint-disable-next-line no-shadow
      const map = new mapboxgl.Map({
        container: mapContainer.current, // container id
        style: 'mapbox://styles/mapbox/satellite-v9', // hosted style id
        center: [-91.874, 42.76], // starting position
        zoom: 10,
      });

      function rotate() {
        map.easeTo({ bearing: 40, duration: 5000, pitch: 0, zoom: 14 });
      }

      map.on('load', () => {
        setMap(map);
        map.resize();
        rotate();
      });

      map.on('move', () => {
        setCoord({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
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

      async function updateArea(e) {
        const data = draw.getAll();
        const center = centerOfMass(e.features[0]).geometry.coordinates;
        const place = await API.getInfoForMap(center[1], center[0]);

        if (data.features.length > 1) {
          draw.delete(e.features[0].id);
          return false;
        }
        if (data.features.length > 0) {
          const areaData = area(data);
          const roundedArea = Math.round(areaData * 100) / 100;
          setDataPolygon({
            region: place.features[0].place_name,
            polygon: data.features,
            polygonCoordinate: e.features[0].geometry.coordinates,
            codePlus: olc.encode(center[1], center[0]),
            square: roundedArea,
            coordinate: { longitude: center[0], latitude: center[1] },
          });
          setState({
            region: place.features[0].place_name,
            polygon: data.features,
            codePlus: olc.encode(center[1], center[0]),
            square: roundedArea,
            polygonCoordinate: e.features[0].geometry.coordinates,
            coordinate: { longitude: center[0], latitude: center[1] },
          });
        } else {
          setDataPolygon({
            region: '',
            polygon: [],
            codePlus: null,
            square: 0,
            polygonCoordinate: [],
            coordinate: { longitude: 0, latitude: 0 },
          });
          setState({
            region: '',
            polygon: [],
            polygonCoordinate: [],
            codePlus: null,
            square: 0,
            coordinate: { longitude: '', latitude: '' },
          });

          // if (e.type !== 'draw.delete') alert('Use the draw tools to draw a polygon!');
        }
      }
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  const uploadStateCoordinate = () => {
    clear(['latitude', 'region', 'longitude']);
    setState(datePolygon);
    setShow(false);
  };

  const customClass = show ? 'active' : '';
  return (
    <div className={`map ${customClass}`}>
      <div className="map__box">
        <div className="map__box-info">
          <div>
            Longitude:
            {coord.lng}
            {' '}
            | Latitude:
            {coord.lat}
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
