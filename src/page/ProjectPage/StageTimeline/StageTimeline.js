/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { formattedDate } from 'src/utils/convert-utils';

// Project stage's icons
import stage1 from 'src/assets/image/stages/stage1.svg';
import stage2 from 'src/assets/image/stages/stage2.svg';
import stage3 from 'src/assets/image/stages/stage3.svg';
import stage4 from 'src/assets/image/stages/stage4.svg';
import stage5 from 'src/assets/image/stages/stage5.svg';
import stage6 from 'src/assets/image/stages/stage6.svg';
import stage7 from 'src/assets/image/stages/stage7.svg';

import {
  stage,
  upload,
  // collateral,
  startEnd,
  // active,
  // lost,
  tooltip,
} from './LangStageTimeline';

const StageTimeline = ({ data, createStageVoting, payStageVoting }) => {
  const intl = useIntl();
  const [images, setImages] = useState([stage1, stage2, stage3, stage4, stage5, stage6, stage7]);

  const processStageTimeLine = () => {
    if (data.length > images.length) {
      const imagesCopy = [...images];
      const middleId = Math.round(imagesCopy.length / 2) - 1;
      const imagesRest = new Array(data.length - images.length).fill(stage4, 0, data.length - images.length);
      imagesCopy.splice(middleId, 0, ...imagesRest);
      setImages(imagesCopy);
    } else if (data.length < images.length) {
      const imagesCopy = [...images];
      const middleId = Math.floor(data.length / 2);
      const numberToDelete = images.length - data.length;
      imagesCopy.splice(middleId, numberToDelete);
      setImages(imagesCopy);
    }
  };

  useEffect(() => {
    processStageTimeLine();
  }, []);

  return (
    <>
      <div className="stage-titles">
        <span className="title-item">{intl.formatMessage(stage)}</span>
        <span className="title-item">{intl.formatMessage(upload)}</span>
        {/* <span className="title-item">{intl.formatMessage(collateral)}</span> */}
        <span className="title-item">Stage Status</span>
        <span className="title-item">{intl.formatMessage(startEnd)}</span>
      </div>
      <div className="stage-list">
        {data.map((item, id) => (
          <div className="stage-item" key={`StageTimeline${id + Date.now()}`}>
            <div className="stage-image">
              <img src={images[id]} alt="" />
            </div>
            <div className={`upload-item ${item.dataUpload ? 'upload-item-confirmed' : ''}`}>
              {item.dataUpload ? <i className="icon-galka" /> : null}
            </div>
            {/* {item.stageStatus.active && item.stageStatus.status !== null && (
              <div className="approve-item approve-item-active">
                {item.stageStatus.status ? (
                  <span className="approve-item-text">Stage Approved</span>
                ) : (
                  <span className="approve-item-text cursor-pointer" onClick={() => payStageVoting(`${item.fee}`, item.id)}>Approve stage</span>
                )}
              </div>
            )}
            {item.stageStatus.active && item.stageStatus.status === null && (
              <div className="approve-item approve-item-active">
                <span className="approve-item-text cursor-pointer" onClick={() => createStageVoting(item.id)}>Create stage voting</span>
              </div>
            )}
            {!item.stageStatus.active && item.stageStatus.status !== null && (
              <div className="approve-item">
                {item.stageStatus.status ? (
                  <span className="approve-item-text">Stage Approved</span>
                ) : (
                  <span className="approve-item-text">Stage not paid</span>
                )}
              </div>
            )}
            {!item.stageStatus.active && item.stageStatus.status === null && (
              <div className="approve-item">
                // <span className="approve-item-text">Vote not created</span>
              </div>
            )} */}
            {item.stageStatus.active && item.stageStatus.status !== null && (
              <div className="approve-item approve-item-active">
                <span className="approve-item-text">Stage Created</span>
              </div>
            )}
            {item.stageStatus.active && item.stageStatus.status === null && (
              <div className="approve-item approve-item-active">
                <span className="approve-item-text cursor-pointer" onClick={() => createStageVoting(item.id)}>Create stage voting</span>
              </div>
            )}
            {!item.stageStatus.active && item.stageStatus.status !== null && (
              <div className="approve-item">
                <span className="approve-item-text">Stage Created</span>
              </div>
            )}
            {!item.stageStatus.active && item.stageStatus.status === null && (
            <div className="approve-item">
              {/* <span className="approve-item-text">Stage not created</span> */}
            </div>
            )}
            <ReactTooltip id="approve-lost" place="right" className="approve-lost-tooltip" arrowColor="#ffffff">
              {intl.formatMessage(tooltip)}
            </ReactTooltip>
            <div className={`term-item ${item.pastTerm ? 'term-item-past' : ''}`}>
              <span className="term-item-start">{formattedDate(item.starts_at, '/')}</span>
              <span className="term-item-end">{formattedDate(item.ends_at, '/')}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StageTimeline;
