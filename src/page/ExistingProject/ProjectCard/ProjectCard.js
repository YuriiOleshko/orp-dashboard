/* eslint-disable no-unneeded-ternary */
import { React, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';
import { formattedDate } from '../../../utils/convert-utils';

const ProjectCard = ({ data, currentStage }) => {
  const history = useHistory();
  const { id, item } = data;
  const { name, region, square, startTimeProject, finishTimeProject } = item;
  const noData = '---';
  const [openSettings, setSettings] = useState(true);

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

  return (
    <div className="dashboard__list__wrap">
      <div className={`dashboard__info__window ${openSettings ? 'hiden' : 'null'}`}>
        <div className="dashboard__info__wrap">
          <span
            className={`dashboard__info ${subZoneExist ? 'not-active' : 'active'}`}
            onClick={() => handleClick('monitoring')}
          >
            Upload Monitoring Data
          </span>
          <span
            className={`dashboard__info ${subZoneExist && !finished ? 'active' : 'not-active'}`}
            onClick={() => handleClick('report')}
          >
            Upload Stage Report
          </span>
        </div>
      </div>
      <div className="dashboard__item" key={`${id}Project`}>
        <div className="dashboard__item-wrapper">
          <div className="dashboard__calling">
            <i className="icon-galka" />
            <span onClick={() => history.push({ pathname: `/project/${id}`, state: item })}>
              {name ? name : 'No name project'}
            </span>
            <div className={`dashboard__calling__allert ${(subZoneExist || currentStage === -1 ? 'hiden' : 'null')}`}>
              <span className="dashboard__calling__allert-text">Upload Monitoring Data</span>
            </div>
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
            <div className="dashboard__setting" onClick={() => { setSettings(!openSettings); }}>
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
