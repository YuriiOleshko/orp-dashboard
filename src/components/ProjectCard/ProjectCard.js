/* eslint-disable */
import React from 'react';
import { useHistory } from 'react-router';

const ProjectCard = ({ data }) => {
  const history = useHistory();
  const { cid, item } = data;
  const { name, region, square, startTimeProject, finishTimeProject } = item;

  let location = '';

  if (region) {
    location = region.split(', ');
    location = location[location.length - 1];
  }

  const convertMeterlToKilometres = (metres) => {
    if (metres / 1e6 > 1e5) {
      return (metres / 1e6).toFixed(0);
    }
    return (metres / 1e6).toFixed(2);
  };

  const addZeroAheadToDate = (num) => `${(`0${num.toString()}`).slice(-2)}`;

  // Format (00.00.00)
  const formattedDate = (timestamp) => {
    const time = new Date(timestamp);
    return `${addZeroAheadToDate(time.getMonth() + 1)}.${addZeroAheadToDate(time.getDate())}.${time.getFullYear().toString().slice(-2)}`;
  };

  return (
    <div className="dashboard__item" key={`${cid}Project`}>
      <div className="dashboard__item-wrapper">
        <div className="dashboard__calling">
          <i className="icon-galka" />
          <span onClick={() => history.push(`/project/${cid}`)}>
            {name}
          </span>
        </div>

        <div className="dashboard__info">
          <div className="dashboard__location">
            <i className="icon-marker" />
            <span>{location}</span>
          </div>
          <div className="dashboard__square">
            <span>{convertMeterlToKilometres(square)}</span>
          </div>
          <div className="dashboard__log">
            <i className="icon-clock" />
            <span className="dashboard__log-start">{formattedDate(startTimeProject)}</span>
            /
            <span className="dashboard__log-end">{formattedDate(finishTimeProject)}</span>
          </div>
          <div className="dashboard__setting">
            <div className="dashboard__point" />
            <div className="dashboard__point" />
            <div className="dashboard__point" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
