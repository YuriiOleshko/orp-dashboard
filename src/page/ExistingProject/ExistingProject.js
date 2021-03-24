import React from 'react';
import { useIntl } from 'react-intl';
import {
  title, filterItem1, filterItem2, filterItem3,
} from './LangExistingProject';
import ProjectCard from '../../components/ProjectCard';

const projects = [{ location: 'Italy', users: 156, logs: '11.12.21 / 1.04.22', iconType: 'icon-galka' }, { location: 'France', users: 151, logs: '11.12.21 / 1.04.22', iconType: 'icon-galka' }, { location: 'Italy', users: 151, logs: '11.12.21 / 1.04.22', iconType: 'icon-galka' }, { location: 'Italy', users: 21, logs: '11.12.21 / 1.04.22', iconType: 'icon-shield' }, { location: 'Italy', users: 1, logs: '11.12.21 / 1.04.22', iconType: 'icon-warning' }, { location: 'Italy', users: 21, logs: '11.12.21 / 1.04.22', iconType: 'icon-shield' }, { location: 'Italy', users: 1, logs: '11.12.21 / 1.04.22', iconType: 'icon-warning' }];

const ExistingProject = () => {
  const intl = useIntl();

  return (
    <>
      <div className="dashboard__panel">
        <h2 className="dashboard__title">
          {intl.formatMessage(title)}
        </h2>
        <div className="dashboard__filters">
          <div className="dashboard__filter active">{intl.formatMessage(filterItem1)}</div>
          <div className="dashboard__filter">{intl.formatMessage(filterItem2)}</div>
          <div className="dashboard__filter">{intl.formatMessage(filterItem3)}</div>
        </div>
      </div>
      <div className="dashboard__list">
        {projects.map((item, index) => <ProjectCard item={item} step={index} />)}
      </div>
    </>
  );
};

export default ExistingProject;
