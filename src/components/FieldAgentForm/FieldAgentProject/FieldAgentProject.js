/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import bubble from 'src/assets/image/wizard/buble.svg';

const FieldAgentProject = ({ fieldAgentData,
  setFieldAgentData,
  id,
  control,
  rules,
  errorsProject,
  errorsSample,
  projectOptions,
  setValue,
  targetProjects,
  addFieldAgentProject,
  edit,
  projectItem,
  deleteFieldAgentProject,
  setModalData }) => {
  const [sampleOptions, setSampleOptions] = useState([]);

  let selectRef = null;
  const defaultValueProj = projectItem.projectName && { label: projectItem.projectName, value: projectItem.projectName };
  const defaultValueSample = projectItem.sampleZones.map((el) => ({ label: el.sName, value: el.sName, sId: el.sId, sName: el.sName }));
  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      padding: 8,
      fontSize: 14,
      color: '#4d4d4d',
      borderRadius: 6,
      borderColor: isFocused ? '#dfdfdf' : '#dfdfdf',
      boxShadow: isFocused ? 0 : 0,
      '&:hover': {
        borderColor: isFocused ? '#dfdfdf' : '#dfdfdf',
      },
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      padding: 0,
      filter: 'drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.05))',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? '#D5F3FB' : 'white',
      color: '#4d4d4d',
      fontSize: 14,
      paddingLeft: 18,
    }),
    placeholder: (styles) => ({
      ...styles,
      color: '#757575',
    }),
    multiValue: (styles) => ({
      ...styles,
      border: '1px solid #2EC3E9',
      backgroundColor: 'transparent',
      borderRadius: 8,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#2EC3E9',
      fontSize: 12,
      fontWeight: 700,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#2EC3E9',
      '&:hover': {
        cursor: 'pointer',
        color: '#2EC3E9',
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
    }),
  };

  const projectStyles = {
    ...customStyles,
    control: (styles, { isFocused }) => ({
      ...styles,
      padding: 8,
      fontSize: 14,
      color: '#4d4d4d',
      borderRadius: 6,
      borderColor: errorsProject ? 'red' : isFocused ? '#dfdfdf' : '#dfdfdf',
      boxShadow: isFocused ? 0 : 0,
      '&:hover': {
        borderColor: errorsProject ? 'red' : isFocused ? '#dfdfdf' : '#dfdfdf',
      },
    }),
  };

  const sampleStyles = {
    ...customStyles,
    control: (styles, { isFocused }) => ({
      ...styles,
      padding: 8,
      fontSize: 14,
      color: '#4d4d4d',
      borderRadius: 6,
      borderColor: errorsSample ? 'red' : isFocused ? '#dfdfdf' : '#dfdfdf',
      boxShadow: isFocused ? 0 : 0,
      '&:hover': {
        borderColor: errorsSample ? 'red' : isFocused ? '#dfdfdf' : '#dfdfdf',
      },
    }),
  };

  const selectOnChange = (event, name, type) => {
    const target = type === 'project' ? event?.value : event;
    if (target) {
      if (type === 'project') {
        const targetProject = targetProjects.find((proj) => proj.item.name === target);
        const { item } = targetProject;
        const samOption = item.subZonesPolygon[item.subZonesPolygon.length - 1].sampleZones.map((sample) => ({ value: `${sample.sampleName}`, label: `${sample.sampleName}`, sId: sample.id, sName: `${sample.sampleName}` }));
        setSampleOptions(samOption);
        setValue(name, target, { shouldValidate: true });
        selectRef.select.clearValue();
      } else {
        setValue(name, target.length ? target : '', { shouldValidate: !!target.length });
      }
    } else {
      if (type === 'project') {
        setSampleOptions([]);
        selectRef.select.clearValue();
      }
      setValue(name, '');
    }
  };

  useEffect(() => {
    if (targetProjects?.length && edit && defaultValueProj) {
      const targetProject = targetProjects.find((proj) => proj.item.name === defaultValueProj.value);
      if (targetProject) {
        const { item } = targetProject;
        const samOption = item.subZonesPolygon[item.subZonesPolygon.length - 1].sampleZones.map((sample) => ({ value: `${sample.sampleName}`, label: `${sample.sampleName}`, sId: sample.id, sName: `${sample.sampleName}` }));
        setSampleOptions(samOption);
      }
    }
  }, [targetProjects]);

  return (
    <div className="field-agent__form-item">
      <div className="field-agent__select">
        <div className="field-agent__select-label">
          <span className="field-agent__select-label-text">{edit ? 'Project' : 'Add Project'}</span>
          <div>
            <div data-tip data-for="projects">
              <ReactSVG src={bubble} />
            </div>
            <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="projects" effect="float">
              If the project you are looking for is not visible in the list, please setup monitoring zone first.
            </ReactTooltip>
          </div>
        </div>
        <Controller
          name={`projects.${id}.projectName`}
          control={control}
          rules={rules}
          defaultValue={projectItem.projectName}
          render={() => (
            <Select
              isClearable
              closeMenuOnSelect
              defaultValue={defaultValueProj}
              placeholder="Choose project"
              options={projectOptions}
              styles={projectStyles}
              onChange={(e) => selectOnChange(e, `projects.${id}.projectName`, 'project')}
            />
          )}
        />
      </div>
      <div className="field-agent__select">
        <span className="field-agent__select-label">{edit ? 'Sampling Zones' : 'Add Sampling Zones'}</span>
        <Controller
          name={`projects.${id}.sampleZones`}
          control={control}
          rules={rules}
          defaultValue={projectItem.sampleZones.length ? projectItem.sampleZones : ''}
          render={() => (
            <Select
              ref={(ref) => {
                selectRef = ref;
              }}
              isClearable
              closeMenuOnSelect={false}
              defaultValue={defaultValueSample}
              isMulti
              placeholder="Choose either one or multiple sampling zones"
              options={sampleOptions}
              styles={sampleStyles}
              onChange={(e) => selectOnChange(e, `projects.${id}.sampleZones`, 'zones')}
            />
          )}
        />
      </div>
      {id > 0 && (
        <div
          className="field-agent__delete"
          onClick={() => {
            if (edit) {
              setModalData({
                deleteItem: true,
                projectId: id,
                projectName: projectItem.projectName,
                fa: fieldAgentData,
              });
            } else {
              deleteFieldAgentProject();
            }
          }}
        >
          <i className="icon-trash" />
        </div>
      )}
      {(id === fieldAgentData.projects.length - 1) && (
        <div className="field-agent__create" onClick={() => addFieldAgentProject()}>
          <i className="icon-plus-cir" />
          <span>Add project</span>
        </div>
      )}
    </div>
  );
};

export default FieldAgentProject;
