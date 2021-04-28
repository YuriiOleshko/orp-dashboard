/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';

// Project stage's icons
import stage1 from '../../assets/image/stages/stage1.svg';
import stage2 from '../../assets/image/stages/stage2.svg';
import stage3 from '../../assets/image/stages/stage3.svg';
import stage4 from '../../assets/image/stages/stage4.svg';
import stage5 from '../../assets/image/stages/stage5.svg';
import stage6 from '../../assets/image/stages/stage6.svg';
import stage7 from '../../assets/image/stages/stage7.svg';

import {
  stage,
  upload,
  collateral,
  startEnd,
  active,
  lost,
  tooltip,
} from './LangStageTimeline';

const StageTimeline = ({ data }) => {
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
        <span className="title-item">{intl.formatMessage(collateral)}</span>
        <span className="title-item">{intl.formatMessage(startEnd)}</span>
      </div>
      <div className="stage-list" style={data.length > 7 ? { overflowX: 'scroll' } : null}>
        {data.map((item, id) => (
          <div className="stage-item">
            <div className="stage-image">
              <img src={images[id]} alt="" />
            </div>
            <div className={`upload-item ${item.dataUpload ? 'upload-item-confirmed' : ''}`}>
              {item.dataUpload ? <i className="icon-galka" /> : null}
            </div>
            {item.collateral ? (
              <div className="collateral-item collateral-item-active">
                <span className="collateral-item-text">{intl.formatMessage(active)}</span>
              </div>
            ) : item.collateral === false ? (
              <div data-tip data-for="collateral-lost" className="collateral-item collateral-item-lost">
                <span className="collateral-item-text">{intl.formatMessage(lost)}</span>
              </div>
            ) : (
              <div className="collateral-item" />
            )}
            <ReactTooltip id="collateral-lost" place="right" className="collateral-lost-tooltip" arrowColor="#ffffff">
              {intl.formatMessage(tooltip)}
            </ReactTooltip>
            <div className={`term-item ${item.pastTerm ? 'term-item-past' : ''}`}>
              <span className="term-item-start">{item.start}</span>
              <span className="term-item-end">{item.end}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StageTimeline;
