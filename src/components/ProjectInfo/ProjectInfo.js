/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useIntl } from 'react-intl';
import {
  size,
  sqkm,
  trees,
  totalDuration,
  months,
  remainingDuration,
  uploads,
  currentOCC,
  tokens,
  projectedOCC,
} from './LangProjectInfo';

const ProjectInfo = ({ data }) => {
  const intl = useIntl();
  return (
    <>
      <div className="col col-1">
        <div className="info-item">
          <span className="info-size">
            {intl.formatMessage(size)}:{' '}
            <span className="info-value">
              {data.size.sqKm} {intl.formatMessage(sqkm)},
              {data.size.trees} {intl.formatMessage(trees)}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-total-duration">
            {intl.formatMessage(totalDuration)}:{' '}
            <span className="info-value">
              {data.totalDuration.start} - {data.totalDuration.end}
              ({data.totalDuration.total} {intl.formatMessage(months)})
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-total-duration">
            {intl.formatMessage(remainingDuration)}:{' '}
            <span className="info-value">
              {data.remainingDuration.start}-{data.remainingDuration.end}
              ({data.remainingDuration.total} {intl.formatMessage(months)})
            </span>
          </span>
        </div>
      </div>

      <div className="col col-2">
        <div className="info-item">
          <span className="info-uploads">
            {intl.formatMessage(uploads)}:{' '}
            <span className="info-value">
              {data.uploads.value}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-current-occ">
            {intl.formatMessage(currentOCC)}:{' '}
            <span className="info-value">
              {data.currentOCC.value} {intl.formatMessage(tokens)}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-size">
            {intl.formatMessage(projectedOCC)}:{' '}
            <span className="info-value">
              {data.projectedOCC.value} {intl.formatMessage(tokens)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
