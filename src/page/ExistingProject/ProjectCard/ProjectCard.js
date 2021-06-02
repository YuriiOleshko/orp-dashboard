/* eslint-disable no-unneeded-ternary */
import React from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';
import { formattedDate } from '../../../utils/convert-utils';

const ProjectCard = ({ data }) => {
  const history = useHistory();
  const { id, item } = data;
  const { name, region, square, startTimeProject, finishTimeProject } = item;
  const noData = '---';

  let location = noData;

  if (region) {
    location = region.split(', ');
    location = location[location.length - 1];
  }

  return (
    <div className="dashboard__item" key={`${id}Project`}>
      <div className="dashboard__item-wrapper">
        <div className="dashboard__calling">
          <i className="icon-galka" />
          <span onClick={() => history.push({ pathname: `/project/${id}`, state: item })}>
            {name ? name : 'No name project'}
          </span>
        </div>

        <div className="dashboard__info">
          <div className="dashboard__location">
            <i className="icon-marker" />
            <span>{location ? location : noData}</span>
          </div>
          <div className="dashboard__square">
            <span>{ square ? <NumberFormat value={square} displayType="text" thousandSeparator decimalScale={3} /> : noData}</span>
          </div>
          <div className="dashboard__log">
            <i className="icon-clock" />
            <span className="dashboard__log-start">{ startTimeProject ? formattedDate(startTimeProject, '.') : noData}</span>
            /
            <span className="dashboard__log-end">{ finishTimeProject ? formattedDate(finishTimeProject, '.') : noData}</span>
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
