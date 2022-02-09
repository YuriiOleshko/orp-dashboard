/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import React, {
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';
import { appStore } from 'src/state/app';
import { contractMethods, getContract } from 'src/utils/near-utils';
import { timerCountdown, formattedDate } from '../../../utils/convert-utils';

const ProjectCard = ({ data, menuArr, setMenuArr, index, allFa }) => {
  const { state } = useContext(appStore);
  const { account, app } = state;

  const { id, item } = data;
  const { name, region, square, startTimeProject, finishTimeProject, currentStage, deadline } = item;

  const [stageTimeleft, setStageTimeleft] = useState(deadline / 1e6);
  const history = useHistory();
  const ref = useRef();

  const noData = '---';
  const [openSettings, setSettings] = useState(true);

  let faExist = true;
  let location = noData;
  const subZoneExist = item.subZonesPolygon?.find((i) => i?.stage === currentStage);
  const finished = item.subZonesPolygon?.find((i) => i?.stage === currentStage && i?.finished);

  allFa.forEach((i) => {
    const projectIds = Object.keys(i.projects);
    const projectSamples = Object.values(i.projects);
    projectIds.forEach((proj) => {
      projectSamples[0].forEach((sample) => {
        if (proj === id && currentStage === sample.stageId) faExist = true;
        else faExist = false;
      });
    });
  });

  if (region) {
    location = region.split(', ');
    location = location[location.length - 1];
  }

  const handleClick = (type) => {
    if (type === 'monitoring' && !subZoneExist) history.push({ pathname: `/data-upload/${id}`, state: data });
    if (type === 'fa' && subZoneExist && !finished) history.push({ pathname: '/field-agents', state: data });
    if (type === 'report' && subZoneExist && faExist && !finished) history.push({ pathname: `/data-upload/${id}`, state: data });
    if (type === 'edit' && subZoneExist && !finished) history.push({ pathname: `/data-upload/${id}`, state: data });
  };

  useEffect(() => {
    if (menuArr[index] === false) {
      ref.current.classList.remove('null');
      ref.current.classList.add('hiden');
    }
    if (menuArr[index] === true) {
      ref.current.classList.remove('hiden');
      ref.current.classList.add('null');
    }
  }, [menuArr]);

  useEffect(async () => {
    const timer = setTimeout(() => {
      if (stageTimeleft <= 0) {
        setStageTimeleft(0);
      } else {
        setStageTimeleft(stageTimeleft - 1000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [stageTimeleft]);

  return (
    <div className="dashboard__list__wrap">
      <div className="dashboard__info__window" ref={ref}>
        <div className="dashboard__info__wrap">
          <span
            className={`dashboard__info ${subZoneExist && !finished ? 'active' : 'not-active'}`}
            onClick={() => handleClick('edit')}
          >
            View Monitoring Zones
          </span>
          <span
            className="dashboard__info active"
            onClick={() => history.push({ pathname: `/project/${id}`, state: item })}
          >
            View Project
          </span>
          <span
            className={`dashboard__info ${subZoneExist && !finished ? 'active' : 'not-active'}`}
            onClick={() => handleClick('fa')}
          >
            Assign Field Agents
          </span>
          <span
            className={`dashboard__info ${subZoneExist && faExist && !finished ? 'active' : 'not-active'}`}
            onClick={() => handleClick('report')}
          >
            Prepare Stage Report
          </span>
        </div>
      </div>
      <div className="dashboard__item" key={`${id}Project`}>
        <div className="dashboard__item-wrapper">
          <div className="dashboard__calling">
            <i className="icon-galka" />
            <span className="dashboard__calling__name" onClick={() => history.push({ pathname: `/project/${id}`, state: item })}>
              {name ? name : 'No name project'}
            </span>
            {currentStage !== -1 && (
              <>
                <div className={`dashboard__calling__allert ${(subZoneExist ? 'hiden' : 'null')}`} onClick={() => handleClick('monitoring')}>
                  <span className="dashboard__calling__allert-text">Setup Monitoring Zones</span>
                </div>
                <div className={`dashboard__calling__allert ${(subZoneExist && !faExist && !finished ? 'null' : 'hiden')}`} onClick={() => handleClick('fa')}>
                  <span className="dashboard__calling__allert-text dashboard__calling__allert-text-blue">Assign Field Agents</span>
                </div>
                <div className={`dashboard__calling__allert ${((subZoneExist && faExist && !finished) ? 'null' : 'hiden')}`} onClick={() => handleClick('report')}>
                  <span className="dashboard__calling__allert-text dashboard__calling__allert-text-blue">Prepare Stage Report</span>
                </div>
              </>
            )}
            <span className="dashboard__calling__stage">{currentStage === -1 ? 'None' : currentStage}</span>
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
              {timerCountdown(stageTimeleft)}
            </div>
            <div
              className="dashboard__setting"
              onClick={() => {
                if (menuArr[index] === false) {
                  setMenuArr((prev) => prev.map((el, i) => {
                    if (i === index) return true;
                    return false;
                  }));
                }
                if (menuArr[index] === true) {
                  setMenuArr((prev) => prev.map((el, i) => {
                    if (i === index) return false;
                    return false;
                  }));
                }
                // if (ref.current.className.includes('hiden')) {
                //   ref.current.classList.remove('hiden');
                //   ref.current.classList.add('null');
                // } else if (ref.current.className.includes('null')) {
                //   ref.current.classList.remove('null');
                //   ref.current.classList.add('hiden');
                // }
              }}
            >
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
