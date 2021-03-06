/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unneeded-ternary */
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
  currentOCCText,
  tokensText,
  projectedOCCText,
} from './LangProjectInfo';

const ProjectInfo = ({ data }) => {
  const { square, amountTrees, startTimeProject, finishTimeProject, remainingUploads = 4, currentOCC = 19, projectedOCC = 87.945 } = data;
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
              {square ? <NumberFormat value={square} displayType="text" thousandSeparator decimalScale={3} /> : noData} {intl.formatMessage(sqkmText)},
              {amountTrees ? <NumberFormat value={amountTrees} displayType="text" thousandSeparator /> : noData} {intl.formatMessage(treesText)}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-total-duration">
            {intl.formatMessage(totalDurationText)}:{' '}
            <span className="info-value">
              { startTimeProject && finishTimeProject ? (
                `${formattedDate(startTimeProject, '/')} - ${formattedDate(finishTimeProject, '/')} (${convertDateToMonths(finishTimeProject - startTimeProject, intl.formatMessage(monthsText), intl.formatMessage(daysText))})`
              ) : noData}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-total-duration">
            {intl.formatMessage(remainingDurationText)}:{' '}
            <span className="info-value">
              { startTimeProject && finishTimeProject ? (
                `${formattedDate(currentDate, '/')} - ${formattedDate(finishTimeProject, '/')} (${convertDateToMonths(finishTimeProject - currentDate, intl.formatMessage(monthsText), intl.formatMessage(daysText))})`
              ) : noData}
            </span>
          </span>
        </div>
      </div>

      <div className="col col-2">
        <div className="info-item">
          <span className="info-uploads">
            {intl.formatMessage(uploadsText)}:{' '}
            <span className="info-value">
              {remainingUploads}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-current-occ">
            {intl.formatMessage(currentOCCText)}:{' '}
            <span className="info-value">
              {currentOCC} {intl.formatMessage(tokensText)}
            </span>
          </span>
        </div>
        <div className="info-item">
          <span className="info-size">
            {intl.formatMessage(projectedOCCText)}:{' '}
            <span className="info-value">
              {projectedOCC} {intl.formatMessage(tokensText)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
