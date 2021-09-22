/* eslint-disable */
import React from 'react';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';

const FieldAgentsModal = ({ modalData, setModalData, deleteFieldAgentProject, setModalActive, edit, setFieldAgents, fa }) => {

  const getHeandler = () => {
    if (edit) {
      deleteFieldAgentProject(modalData.projectId);
    } else {
      const copyFa = [...fa];
      const targetIndex = copyFa.findIndex((el) => el.id === modalData.fa.id);
      copyFa.splice(targetIndex, 1);
      setFieldAgents(copyFa);
    }
    setModalData(false);
  };

  return (
    <div className="field-agents_wrap">
      <div className="field-agents_modal">
        {modalData.deleteItem ? (
          <>
            <span className="field-agents_modal_header deassign">{edit ? 'Deassign Field Agent' : 'Remove Field Agent'}</span>
            <span className="field-agents_modal_text deassign">
              {edit ? `Please note that ${modalData.fa.name} will be deassigned from the project ${modalData.projectName}.
                Are you sure you want to proceed?` : `Please note that ${modalData.fa.name} will be removed from all assigned projects.
                This action cannot be undone!`}
            </span>
            <div className="field-agents_modal_btn-wrap">
              <CustomBtn
                label="Save"
                handleClick={getHeandler}
                customClass="field-agents_modal_button"
              />
              <CustomBtn
                label="Cancel"
                handleClick={() => { setModalData(false); }}
                customClass="field-agents_modal_button"
              />
            </div>
          </>
        ) : (
          <>
            <i className="icon-galka" />
            <span className="field-agents_modal_header sucsses">Success!</span>
            <span className="field-agents_modal_text sucsses">{modalData.content}</span>
            <CustomBtn
              label="Continue"
              handleClick={() => { setModalData(false); setModalActive(false); }}
              customClass="field-agents_modal_button one-btn"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FieldAgentsModal;
