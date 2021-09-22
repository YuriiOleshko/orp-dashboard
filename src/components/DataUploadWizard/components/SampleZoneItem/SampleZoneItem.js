/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import CustomBtn from 'src/generic/CustomBtn';
import CustomInput from 'src/generic/CustomInput';
import CustomSelect from 'src/generic/CustomSelect/CustomSelect';
import SampleTree from '../SampleTree';

const SampleZoneItem = ({ sampleName, coordinates, sampleTrees, setSampleZones, register, errors, control, setValue, warning, getValues }) => {
  const [hideElement, setHideElement] = useState(true);
  const [showAddBtn, setShowAddBtn] = useState(true);
  // const toggleDropDown = (el) => {
  //   if (drops.includes(el)) {
  //     const newDrops = drops.filter((elem) => !(elem === el));
  //     setDrops(newDrops);
  //     return;
  //   }
  //   setDrops([...drops, el]);
  // };

  const addTree = () => {
    const updSampleTrees = [...sampleTrees];
    const lastTreeNameNumber = updSampleTrees[updSampleTrees.length - 1].treeName.split('T')[1];
    const structure = {
      id: Date.now(),
      treeName: `${sampleName}_T${+lastTreeNameNumber + 1}`,
      status: '',
      height: '',
      diameter: '',
      treePhoto: '',
      labelPhoto: '',
    };
    updSampleTrees.push(structure);
    setSampleZones((prevZones) => {
      const copyZones = [...prevZones];
      const targetZone = copyZones.find((item) => item.sampleName === sampleName);
      const targetZoneIndex = copyZones.findIndex((item) => item.sampleName === sampleName);
      const updTargetZone = { ...targetZone, sampleTrees: updSampleTrees };
      copyZones.splice(targetZoneIndex, 1, updTargetZone);
      return copyZones;
    });
    if (updSampleTrees.length >= 15) setShowAddBtn(false);
  };

  return (
    <div className="sample-zone">
      <div className="sample-zone__header">
        <div className="sample-zone__header-name">
          <span>{sampleName}</span>
        </div>
        <div className="sample-zone__header-coord">
          <span className="sample-zone__coord">{coordinates[0]}</span>
          <span className="sample-zone__coord">{coordinates[1]}</span>
        </div>
        <div className="sample-zone__header-warning">
          {warning && (
            <>
              {warning.missingDescription && (
                <>
                  <i className="icon-exclamation" />
                  <span>Missing description!</span>
                </>
              )}
              {warning.missingLength && (
                <>
                  <i className="icon-exclamation" />
                  <span>Add at least 10 sample trees in this Sample zone to move to the next sample zone.</span>
                </>
              )}
            </>
          )}
        </div>
        <div className={`sample-zone__header-btn ${hideElement ? 'up' : 'dropdown'}`}>
          <CustomBtn
            label={(
              <i
                className={`icon-collapse-arrow ${hideElement ? 'up' : 'dropdown'}`}
              />
            )}
            handleClick={() => setHideElement(!hideElement)}
            // handleClick={() => toggleDropDown(sampleName)}
            customClass="sample-zone__btn"
          />
        </div>
      </div>
      {/* <div className={`sample-zone__content ${!drops.includes(sampleName) ? 'up' : 'dropdown'}`}> */}
      <div className={`sample-zone__content ${hideElement ? 'up' : 'dropdown'}`}>
        <div className="content-header">
          <span className="header-tree">Tree</span>
          <span className="header-status">Tree status</span>
          <span className="header-height">Height, sm</span>
          <span className="header-diameter">Diameter, sm</span>
          <span className="header-tree-photo">Upload tree photo</span>
          <span className="header-label-photo">Upload tree label photo</span>
        </div>
        <div className="content-list">
          {sampleTrees.map((item, id) => (
            <SampleTree
              sampleName={sampleName}
              sampleTree={item}
              sampleTreeIndex={id}
              sampleTreeId={`T${item.id}`}
              sampleTrees={sampleTrees}
              // treeName={item.treeName}
              treeName={item.treeName}
              status={item.status}
              height={item.height}
              diameter={item.diameter}
              treePhoto={item.treePhoto}
              labelPhoto={item.labelPhoto}
              setSampleZones={setSampleZones}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
              getValues={getValues}
              setShowAddBtn={setShowAddBtn}
              key={`Tree${item.id}`}
            />
          ))}
        </div>
        {showAddBtn && (
          <div className="content-add">
            <CustomBtn
              label={(
                <div className="add-tree-wrapper">
                  <i className="icon-plus-cir" />
                  <span className="add-tree-text">Add tree</span>
                </div>
                      )}
              handleClick={() => addTree()}
              customClass="content-add-btn"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleZoneItem;
