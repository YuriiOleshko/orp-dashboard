/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import CustomSelect from 'src/generic/CustomSelect';
import CustomInput from 'src/generic/CustomInput';
import UploadImage from 'src/components/UploadImage/UploadImage';

const SampleTree = ({ sampleName, sampleTree, sampleTreeIndex, sampleTreeId, sampleTrees, treeName, status, height, diameter, treePhoto, labelPhoto, setSampleZones, register, errors, control, setValue, getValues, setShowAddBtn }) => {
  const [sampleTreeData, setSampleTreeData] = useState({});

  const deleteTree = () => {
    const updSampleTrees = [...sampleTrees];
    updSampleTrees.splice(sampleTreeIndex, 1);
    if (updSampleTrees.length < 15) setShowAddBtn(true);
    setSampleZones((prevZones) => {
      const copyZones = [...prevZones];
      const targetZone = copyZones.find((item) => item.sampleName === sampleName);
      const targetZoneIndex = copyZones.findIndex((item) => item.sampleName === sampleName);
      const updTargetZone = { ...targetZone, sampleTrees: updSampleTrees };
      copyZones.splice(targetZoneIndex, 1, updTargetZone);
      return copyZones;
    });
  };

  // const handleChange = (ev, field, file = false) => {
  //   const updSampleTree = { ...sampleTree };
  //   const updSampleTrees = [...sampleTrees];
  //   if (file) {
  //     updSampleTree[field] = ev;
  //   } else {
  //     updSampleTree[field] = ev.target.value;
  //   }
  //   updSampleTrees.splice(sampleTreeIndex, 1, updSampleTree);
  //   setSampleZones((prevZones) => {
  //     const copyZones = [...prevZones];
  //     const targetZone = copyZones.find((item) => item.sampleName === sampleName);
  //     const targetZoneIndex = copyZones.findIndex((item) => item.sampleName === sampleName);
  //     const updTargetZone = { ...targetZone, sampleTrees: updSampleTrees };
  //     copyZones.splice(targetZoneIndex, 1, updTargetZone);
  //     return copyZones;
  //   });
  // };

  return (
    <div className="tree-item">
      <div className="tree-name">
        <Controller
          control={control}
          name={`${sampleName}.${sampleTreeId}.treeName`}
          as={<span>{treeName}</span>}
          defaultValue={treeName}
        />
      </div>
      <div className="tree-status">
        <CustomSelect
          name={`${sampleName}.${sampleTreeId}.status`}
          // register={register({ required: true })}
          // required
          showErrorMessage={false}
          error={errors[sampleName] && errors[sampleName][sampleTreeId] && errors[sampleName][sampleTreeId].status}
          value={status}
          classError="error__background"
          optionArray={[{ label: 'Status', value: '' }, { label: 'Damaged', value: 'damaged' }, { label: 'Alive', value: 'alive' }, { label: 'Dead', value: 'dead' }]}
          // change={(ev) => handleChange(ev, 'status')}
        />
      </div>
      <div className="tree-height">
        <CustomInput
          type="text"
          placeholder="cm"
          name={`${sampleName}.${sampleTreeId}.height`}
          // register={register({ required: true })}
          // required
          showErrorMessage={false}
          error={errors[sampleName] && errors[sampleName][sampleTreeId] && errors[sampleName][sampleTreeId].height}
          customClass="tree-height-input"
          value={height}
          classError="error__background"
          onlyNumber
          // change={(ev) => handleChange(ev, 'height')}
        />
      </div>
      <div className="tree-diameter">
        <CustomInput
          type="text"
          placeholder="cm"
          name={`${sampleName}.${sampleTreeId}.diameter`}
          // register={register({ required: true })}
          // required
          showErrorMessage={false}
          error={errors[sampleName] && errors[sampleName][sampleTreeId] && errors[sampleName][sampleTreeId].diameter}
          customClass="tree-diameter-input"
          value={diameter}
          classError="error__background"
          onlyNumber
          // change={(ev) => handleChange(ev, 'diameter')}
        />
      </div>
      <div className="tree-photo">
        <UploadImage
          photo={treePhoto}
          fieldName="treePhoto"
          name={`${sampleName}.${sampleTreeId}.treePhoto`}
          control={control}
          setValue={setValue}
          getValues={getValues}
          error={errors[sampleName] && errors[sampleName][sampleTreeId] && errors[sampleName][sampleTreeId].treePhoto}
          // rules={{ required: true }}
          // change={handleChange}
        />
      </div>
      <div className="tree-label">
        <UploadImage
          photo={labelPhoto}
          fieldName="labelPhoto"
          name={`${sampleName}.${sampleTreeId}.labelPhoto`}
          control={control}
          setValue={setValue}
          getValues={getValues}
          error={errors[sampleName] && errors[sampleName][sampleTreeId] && errors[sampleName][sampleTreeId].labelPhoto}
          // rules={{ required: true }}
          // change={handleChange}
        />
      </div>
      {sampleTreeIndex > 9 && (
        <div
          className="tree-delete"
          onClick={() => deleteTree()}
        >
          <i className="icon-trash" />
        </div>
      )}
    </div>
  );
};

export default SampleTree;
