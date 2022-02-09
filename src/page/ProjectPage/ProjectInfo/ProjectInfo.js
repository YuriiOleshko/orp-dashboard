/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useIntl } from 'react-intl';
import NumberFormat from 'react-number-format';
import { formattedDate, convertDateToMonths } from 'src/utils/convert-utils';
import {
  sizeText,
  sqkmText,
  treesText,
  totalDurationText,
  monthsText,
  daysText,
  remainingDurationText,
  uploadsText,
} from './LangProjectInfo';

const ProjectInfo = ({ data }) => {
  const { square, amountTrees, startTimeProject, finishTimeProject, remainingUploads, type, developer } = data;
  const noData = '---';
  const intl = useIntl();
  const currentDate = Date.now();

  return (
    <>
      <div className="col col-1">
        <div className="info-item">
          <span className="info-size">
            {intl.formatMessage(sizeText)}:{' '}
            <span className="info-value">
              {square ? <NumberFormat value={square} displayType="text" thousandSeparator decimalScale={3} /> : noData} {intl.formatMessage(sqkmText)}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-total-duration">
            {intl.formatMessage(totalDurationText)}:{' '}
            <span className="info-value">
              { startTimeProject && finishTimeProject ? (
                `${formattedDate(startTimeProject, '/')} - ${formattedDate(finishTimeProject, '/')} (${convertDateToMonths(finishTimeProject - startTimeProject, 'years')})`
              ) : noData}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-total-duration">
            {intl.formatMessage(remainingDurationText)}:{' '}
            <span className="info-value">
              { startTimeProject && finishTimeProject ? (
                `${formattedDate(currentDate, '/')} - ${formattedDate(finishTimeProject, '/')} (${convertDateToMonths(finishTimeProject - currentDate, 'years')})`
              ) : noData}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-uploads">
            {intl.formatMessage(uploadsText)}:{' '}
            <span className="info-value">
              {remainingUploads}
            </span>
          </span>
        </div>
      </div>

      <div className="col col-2">
        <div className="info-item">
          <span className="info-uploads">
            Project Developer:{' '}
            <span className="info-value">
              {developer}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-uploads">
            Project Type:{' '}
            <span className="info-value">
              {type}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-uploads">
            Estimated Number of Trees:{' '}
            <span className="info-value">
              {amountTrees ? <NumberFormat value={amountTrees} displayType="text" thousandSeparator /> : noData} {intl.formatMessage(treesText)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
