/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';
import { formattedDate } from '../../../utils/convert-utils';

const ProjectCard = ({ data, currentStage, menuArr, setMenuArr, index }) => {
  const history = useHistory();
  const { id, item } = data;
  const { name, region, square, startTimeProject, finishTimeProject } = item;
  const noData = '---';
  const [openSettings, setSettings] = useState(true);
  const ref = useRef();

  let location = noData;
  const subZoneExist = item.subZonesPolygon?.find((i) => i?.stage === currentStage);
  const finished = item.subZonesPolygon?.find((i) => i?.stage === currentStage && i?.finished);

  if (region) {
    location = region.split(', ');
    location = location[location.length - 1];
  }

  const handleClick = (type) => {
    if (type === 'monitoring' && !subZoneExist) history.push({ pathname: `/data-upload/${id}`, state: data });
    if (type === 'report' && subZoneExist && !finished) history.push({ pathname: `/data-upload/${id}`, state: data });
  };

  useEffect(() => {
    if (menuArr[index] === false) {
      ref.current.classList.remove('null');
      ref.current.classList.add('hiden');
    }
    if (menuArr[index] === true) {
      ref.current.classList.remove('hiden');
      ref.current.classList.add('null');
    }
  }, [menuArr]);

  return (
    <div className="dashboard__list__wrap">
      <div className="dashboard__info__window" ref={ref}>
        <div className="dashboard__info__wrap">
          <span
            className="dashboard__info active"
            onClick={() => history.push({ pathname: `/project/${id}`, state: item })}
          >
            View Project
          </span>
          {/* <span
            className={`dashboard__info ${subZoneExist ? 'not-active' : 'active'}`}
            onClick={() => handleClick('monitoring')}
          >
            Setup Monitoring Zones
          </span>
          <span
            className={`dashboard__info ${subZoneExist && !finished ? 'active' : 'not-active'}`}
            onClick={() => handleClick('report')}
          >
            Upload Stage Report
          </span> */}
        </div>
      </div>
      <div className="dashboard__item" key={`${id}Project`}>
        <div className="dashboard__item-wrapper">
          <div className="dashboard__calling">
            <i className="icon-galka" />
            <span className="dashboard__calling__name" onClick={() => history.push({ pathname: `/project/${id}`, state: item })}>
              {name ? name : 'No name project'}
            </span>
            {currentStage !== -1 && (
              <>
                <div className={`dashboard__calling__allert ${(subZoneExist ? 'hiden' : 'null')}`} onClick={() => handleClick('monitoring')}>
                  <span className="dashboard__calling__allert-text">Setup Monitoring Zones</span>
                </div>
                <div className={`dashboard__calling__allert ${((subZoneExist && !finished) ? 'null' : 'hiden')}`} onClick={() => handleClick('report')}>
                  <span className="dashboard__calling__allert-text dashboard__calling__allert-text-blue">Upload Stage Report</span>
                </div>
              </>
            )}
            <span className="dashboard__calling__stage">{currentStage === -1 ? 'None' : currentStage}</span>
          </div>
          <div className="dashboard__info">
            <div className="dashboard__location">
              <i className="icon-marker" />
              <span>{location ? location : noData}</span>
            </div>
            <div className="dashboard__square">
              <span>{square ? <NumberFormat value={square} displayType="text" thousandSeparator decimalScale={3} /> : noData}</span>
            </div>
            <div className="dashboard__log">
              <i className="icon-clock" />
              <span className="dashboard__log-start">{startTimeProject ? formattedDate(startTimeProject, '.') : noData}</span>
              /
              <span className="dashboard__log-end">{finishTimeProject ? formattedDate(finishTimeProject, '.') : noData}</span>
            </div>
            <div
              className="dashboard__setting"
              onClick={() => {
                if (menuArr[index] === false) {
                  setMenuArr((prev) => prev.map((el, i) => {
                    if (i === index) return true;
                    return false;
                  }));
                }
                if (menuArr[index] === true) {
                  setMenuArr((prev) => prev.map((el, i) => {
                    if (i === index) return false;
                    return false;
                  }));
                }
                // if (ref.current.className.includes('hiden')) {
                //   ref.current.classList.remove('hiden');
                //   ref.current.classList.add('null');
                // } else if (ref.current.className.includes('null')) {
                //   ref.current.classList.remove('null');
                //   ref.current.classList.add('hiden');
                // }
              }}
            >
              <div className="dashboard__point" />
              <div className="dashboard__point" />
              <div className="dashboard__point" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
