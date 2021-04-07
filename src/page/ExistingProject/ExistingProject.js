import React from 'react';
import { useIntl } from 'react-intl';
import {
  title, filterItem1, filterItem2, filterItem3,
} from './LangExistingProject';
import ProjectCard from '../../components/ProjectCard';

// eslint-disable-next-line max-len
const projects = [{ location: 'Italy', users: 156, logs: '11.12.21 / 1.04.22', iconType: 'icon-galka', address: 'iyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgGL' }, { location: 'France', users: 151, logs: '11.12.21 / 1.04.22', iconType: 'icon-galka', address: 'gyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgG0' }, { location: 'Italy', users: 151, logs: '11.12.21 / 1.04.22', iconType: 'icon-galka', address: 'iyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgQW' }, { location: 'Italy', users: 21, logs: '11.12.21 / 1.04.22', iconType: 'icon-shield', address: 'xyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4Ag2t' }, { location: 'Italy', users: 1, logs: '11.12.21 / 1.04.22', iconType: 'icon-warning', address: 'dyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgG2L' }, { location: 'Italy', users: 21, logs: '11.12.21 / 1.04.22', iconType: 'icon-shield', address: 'iyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgGs' }, { location: 'Italy', users: 1, logs: '11.12.21 / 1.04.22', iconType: 'icon-warning', address: 'xyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgG1' }];

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
        {/* eslint-disable-next-line react/no-array-index-key */}
        {projects.map((item, index) => <ProjectCard item={item} step={index} key={`${index}Project`} />)}
      </div>
    </>
  );
};

export default ExistingProject;
