/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import FieldAgentModal from '../FieldAgentForm/FieldAgentModal/FieldAgentModal';

const FieldAgentDropList = ({ fieldAgent, listNumber, setModalActive, setEditFieldAgent, setFieldAgents, setModalData, modalData, fa }) => {
  const [hideElement, setHideElement] = useState(false);
  const projects = fieldAgent.projects.map((zones) => zones);
  const sampleZones = projects.map((project) => project.sampleZones);

  const getModal = () => {
    setModalData({
      deleteItem: true,
      fa: fieldAgent,
    });
  };
  return (
    <>
      <div className={`field-agent_drop ${hideElement ? 'dropdown' : 'up'}`}>
        <span className={`field-agent_drop_line ${hideElement ? 'dropdown' : 'up'}`} />
        <div className="field-agent_drop_left">
          <span className="field-agent_drop_left field-agent_drop_top-header">{`${listNumber}. ${fieldAgent.name}`}</span>
          <div className="field-agent_drop-wrap left-wrap">
            <span className="field-agent_drop-header">Projects:</span>
            {projects.map((project, index) => <span className="field-agent_drop_project-info" key={`N${index + 1}`}>{project.projectName}</span>)}
          </div>
        </div>
        <div className="field-agent_drop_center">
          <div className="field-agent_drop_top-header name-wrap">
            {projects.length ? '' : '...'}
            <span className="field-agent_drop_top-header_name" onClick={() => { setHideElement(!hideElement); }}>
              {projects[0].projectName}
              {projects.length > 1 ? ' ...' : ''}
            </span>
            {/* {projects.map((project) => <span className="field-agent_drop_top-header-b">{project.projectName}</span>)} */}
          </div>
          <div className="field-agent_drop-wrap">
            <span className="field-agent_drop-header">Sampling zones:</span>
            {sampleZones.map((zone, index) => (
              <span className="field-agent_drop_project-info" key={`N${index + 1}`}>
                {`${zone}`}
              </span>
            ))}
          </div>
        </div>
        <div className="field-agent_drop_right">
          <div className="field-agent_drop_right-wrap">
            <span className="field-agent_drop_top-header">{fieldAgent.email}</span>
            <div className={`field-agent_drop_open-btn ${hideElement ? 'up' : 'dropdown'}`}>
              <CustomBtn
                label={(
                  <i
                    className={`icon-collapse-arrow ${hideElement ? 'up' : 'dropdown'}`}
                  />
                )}
                handleClick={() => setHideElement(!hideElement)}
                // handleClick={() => toggleDropDown(sampleName)}
                customClass="field-agent_drop_open-btn"
              />
            </div>
          </div>
          <div className="field-agent_drop_btn-wrap">
            <CustomBtn
              label="Edit Agent’s Info"
              customClass="field-agent_drop_edit-btn"
              handleClick={() => {
                setEditFieldAgent({ ...fieldAgent });
                setModalActive(true);
              }}
              iconClass="icon-pencil"
            />
            <CustomBtn
              label="Resend Invite"
              customClass="field-agent_drop_edit-btn"
              handleClick={() => { }}
              iconClass="icon-loop-arrow"
            />
            <CustomBtn
              label="Delete This Agent"
              customClass="field-agent_drop_edit-btn_cancel"
              handleClick={getModal}
              iconClass="icon-trash"
            />
          </div>
        </div>
      </div>
      {modalData ? (
        <FieldAgentModal
          fieldAgent={fieldAgent}
          setModalData={setModalData}
          modalData={modalData}
          setModalActive={setModalActive}
          fa={fa}
          setFieldAgents={setFieldAgents}
        />
      ) : ''}
    </>
  );
};

export default FieldAgentDropList;
