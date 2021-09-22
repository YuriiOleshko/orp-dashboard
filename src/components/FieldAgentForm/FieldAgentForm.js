/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { appStore } from 'src/state/app';
import CustomBtn from 'src/generic/CustomBtn/CustomBtn';
import CustomInput from 'src/generic/CustomInput/CustomInput';
import { contractMethods, getContract } from 'src/utils/near-utils';
import FieldAgentProject from './FieldAgentProject/FieldAgentProject';
import FieldAgentsModal from './FieldAgentModal/FieldAgentModal';

const FieldAgentForm = ({ title, buttonText, setModalActive, setFieldAgents, edit, editFieldAgent, modalData, setModalData }) => {
  const { state, update } = useContext(appStore);
  const { account, app } = state;
  const projectWithSubzone = app.nftTokens.filter((token) => token.item.subZonesPolygon?.length);

  const { handleSubmit, errors, register, control, setValue, getValues } = useForm();
  const [fieldAgentData, setFieldAgentData] = useState(edit ? editFieldAgent : {
    id: Date.now(),
    projectOperator: account.accountId,
    name: '',
    email: '',
    projects: [{ id: Date.now(), projectName: '', sampleZones: [], stage: '', projectId: '' }],
  });
  const [targetStages, setTargetStages] = useState([]);
  const [targetProjects, setTargetProjects] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [similarWarning, setSimilarWarning] = useState(false);
  const [editEmail, setEditEmail] = useState(fieldAgentData.email);

  const getModal = () => {
    if (editEmail !== fieldAgentData.email) {
      setModalData({
        content: 'Invites to all projects have been sent to the Field Agent’s new email.',
      });

    } else {
      setModalData({
        content: 'All changes have been saved.',
      });
  }
}

  const onSubmit = (data) => {
    let hasSimilar;
    const copyData = { ...data, projectOperator: account.accountId };
    const { projects } = copyData;
    const projectsList = projects.map((item) => item.projectName);
    projectsList.sort();
    for (let i = 1; i <= projectsList.length - 1; i++) {
      if (projectsList[i - 1] === projectsList[i]) {
        hasSimilar = true;
        break;
      } else {
        hasSimilar = false;
        continue;
      }
    }
    if (hasSimilar) {
      setSimilarWarning(true);
      return;
    }
    setSimilarWarning(false);
    const updProjects = projects.map((item, index) => {
      const projIdObj = targetProjects.find((el) => el.item.name === item.projectName);
      const dumbIdObj = fieldAgentData.projects.find((el, i) => index === i);
      const stageObj = targetStages.find((el, i) => index === i);
      return { ...item, projectId: projIdObj.id, id: dumbIdObj.id, stage: stageObj }
    });
    setFieldAgentData({ ...copyData, id: fieldAgentData.id, projects: updProjects });
    if (edit) {
      setFieldAgents((prev) => {
        const targetIndex = prev.findIndex((el) => el.id === fieldAgentData.id);
        prev.splice(targetIndex, 1, { ...copyData, id: fieldAgentData.id, projects: updProjects });
        return prev;
      });
    } else {
      setFieldAgents((prev) => {
        prev.push({ ...copyData, id: fieldAgentData.id, projects: updProjects });
        return prev;
      });
    }
    getModal();
  };

  const addFieldAgentProject = () => {
    const copyProjects = [...fieldAgentData.projects];
    copyProjects.push({ id: Date.now(), projectName: '', sampleZones: [], stage: '', projectId: '' });
    setFieldAgentData({ ...fieldAgentData, projects: copyProjects });
    setSimilarWarning(false);
  };

  useEffect(async () => {
    if (account && account.accountId) {
      const contract = getContract(account, contractMethods, 0);
      const projectStages = await Promise.all(
        projectWithSubzone.map(async (proj) => {
          const currentStageForProject = await contract.get_current_project_stage({ project_id: proj.id });
          if (currentStageForProject) {
            return currentStageForProject.id;
          }
        })
      );
      let currentStages = [];

      const projectsWithCurrentSubzone = projectWithSubzone.filter((proj) => {
        const subzoneWithCurrentStage = proj.item.subZonesPolygon.find((sub, id) => {
          if (sub.stage === projectStages[id]) {
            currentStages.push(projectStages[id]);
            return true;
          }
          return false;
        });
        return subzoneWithCurrentStage;
      });
      const projOptions = projectsWithCurrentSubzone.map((proj) => ({ value: `${proj.item.name}`, label: `${proj.item.name}` }));
      setTargetProjects(projectsWithCurrentSubzone);
      setTargetStages(currentStages);
      setProjectOptions(projOptions);
    }
  }, [account]);

  const deleteFieldAgentProject = (id) => {
    const copyProjects = [...fieldAgentData.projects];
    copyProjects.splice(id, 1);
    setFieldAgentData({ ...fieldAgentData, projects: copyProjects });
    setModalData(false)
  };

  const checkEmail = (ev) => setEditEmail(ev.target.value);

  return (
    <div className="field-agent__form-wrapper">
      <div className="field-agent__form">
        <h2 className="field-agent__form-title">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field-agent__form-body">
            <div className="field-agent__form-item">
              <CustomInput
                type="text"
                label="Name"
                placeholder="Name"
                customClass="field-agent__input"
                register={register({ required: 'This is required', maxLength: 100 })}
                classError="required"
                error={errors.name}
                value={fieldAgentData.name}
                name="name"
              />
              <CustomInput
                type="text"
                label="E-mail"
                placeholder="E-mail"
                customClass="field-agent__input"
                register={register({
                  required: 'This is required',
                  maxLength: 100,
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
                })}
                classError="required"
                error={errors.email}
                value={fieldAgentData.email}
                name="email"
                change={checkEmail}
              />
            </div>
            {fieldAgentData.projects.map((item, id) => (
              <FieldAgentProject
                fieldAgentData={fieldAgentData}
                setFieldAgentData={setFieldAgentData}
                id={id}
                control={control}
                rules={{ required: true }}
                projectOptions={projectOptions}
                setValue={setValue}
                targetProjects={targetProjects}
                addFieldAgentProject={addFieldAgentProject}
                errorsProject={errors?.projects && errors.projects[id]?.projectName}
                errorsSample={errors?.projects && errors.projects[id]?.sampleZones}
                edit={edit}
                projectItem={item}
                key={item.id}
                deleteFieldAgentProject={() => deleteFieldAgentProject(id)}
                setModalData={setModalData}
              />
            ))}
            <div className="field-agent__form-item field-agent__form-control">
              {similarWarning && <span className="field-agent__form-warning">You have repetetive projects for this field agent!</span>}
              <CustomBtn
                label={buttonText}
                handleClick={() => {}}
                customClass="field-agent__button"
                type="submit"
              />
              <CustomBtn
                label="Cancel"
                handleClick={() => setModalActive(false)}
                customClass="field-agent__button"
              />
            </div>
          </div>
        </form>
        {modalData ?
          (<FieldAgentsModal
            edit={edit}
            modalData={modalData}
            setModalData={setModalData}
            deleteFieldAgentProject={deleteFieldAgentProject}
            setModalActive={setModalActive} />) : ''}
      </div>
    </div>
  );
};

export default FieldAgentForm;
