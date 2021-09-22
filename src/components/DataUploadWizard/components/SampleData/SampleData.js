/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
// eslint-disable-next-line import/no-unresolved
import CustomInput from 'src/generic/CustomInput';
// eslint-disable-next-line import/no-unresolved
import CustomBtn from 'src/generic/CustomBtn';
import SampleZoneItem from 'src/components/DataUploadWizard/components/SampleZoneItem';
import WrapperScaleImg from '../../../WrapperScaleImg/WrapperScaleImg';

const SampleData = ({ totalData, setTotalData, nextPage, prevPage, currentStage }) => {
  const { register, handleSubmit, errors, clearErrors, control, setValue, getValues } = useForm();
  const history = useHistory();

  const currSubZone = { ...totalData.subZonesPolygon[currentStage] };
  const currentSampleZones = [...currSubZone.sampleZones];
  const sZones = currentSampleZones.map((el, index) => ({
    ...el,
    sampleName: `S${index + 1}`,
    coordinates: el.geometry.coordinates,
    sampleTrees: el.sampleTrees.length ? el.sampleTrees : Array.from({ length: 10 }).map((e, i) => ({
      id: Date.now() + i,
      treeName: `S${index + 1}_T${i + 1}`,
      status: 'Damaged',
      height: '250',
      diameter: '100',
      treePhoto: '/ipfs/QmWFSPqvG3j8wRfD9RRuQPP4P2EcR19YpPaAShEZPpi4r8',
      labelPhoto: '/ipfs/QmWFSPqvG3j8wRfD9RRuQPP4P2EcR19YpPaAShEZPpi4r8',
    })),
  }));
  const [currentSubZone, setCurrentSubZone] = useState(currSubZone);
  const [sampleZones, setSampleZones] = useState(sZones);
  const [warning, setWarning] = useState([]);
  // const [drops, setDrops] = useState([]);
  // console.log(sampleZones);

  const onSubmit = (data) => {
    const currentZones = sampleZones.map((item) => item.sampleName);
    const errorZones = currentZones.map((item) => {
      const missingLength = Object.values(getValues()[item] || {});
      return { missingLength: missingLength.length < 10 };
    });
    const hasError = errorZones.find((item) => item.missingLength);
    if (hasError) {
      setWarning(errorZones);
      return;
    }
    const formSampleZones = Object.values(data);
    const oldSampleZones = Object.values(currentSubZone.sampleZones);
    const updSampleZones = formSampleZones.map((item, index) => {
      const updSampleTrees = Object.values(item);
      const sampleTreesId = Object.keys(item);
      const updSampleTreesWithId = updSampleTrees.map((i, id) => ({ ...i, id: +sampleTreesId[id].split('T')[1] }));
      const target = { ...oldSampleZones[index] };
      target.sampleTrees = updSampleTreesWithId;
      return target;
    });
    const updSubZones = [...totalData.subZonesPolygon];
    const lastSubZone = updSubZones.pop();
    lastSubZone.sampleZones = updSampleZones;
    updSubZones.push(lastSubZone);
    setTotalData({ ...totalData, subZonesPolygon: updSubZones });
    nextPage();
  };

  // useEffect(() => {
  //   setTotalData({ ...totalData });
  // }, [sampleZones]);

  const onError = (errors) => {
    const currentZones = sampleZones.map((item) => item.sampleName);
    const missingDescription = Object.keys(errors);
    const errorZones = currentZones.map((item) => {
      const target = missingDescription.find((i) => i === item);
      const missingLength = Object.values(getValues()[item] || {});
      return target ? { missingDescription: true } : { missingLength: missingLength.length < 10 };
    });
    setWarning(errorZones);
  };

  const handleClickBack = () => {
    const subZoneExist = totalData.subZonesPolygon.find((item) => item.stage === currentStage);
    if (subZoneExist) history.push('/');
    else prevPage();
  };

  return (
    <>
      <div className="upload-wizard__monitoring">
        <div className="upload-wizard__area-info">
          <div className="upload-wizard__area">
            <span>Area, sq. km</span>
            <p className="upload-wizard__input-value">{currentSubZone.square}</p>
          </div>
          <div className="upload-wizard__num-zones">
            <span>Number of Sample zones</span>
            <p className="upload-wizard__input-value">{sampleZones.length}</p>
          </div>
        </div>
        <div className="upload-wizard__map">
          <WrapperScaleImg cid={currentSubZone.cidSampleScreenShot} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="upload-wizard__sz-list">
          {sampleZones.map((i, id) => (
            <SampleZoneItem
              sampleName={i.sampleName}
              coordinates={i.coordinates}
              sampleTrees={i.sampleTrees}
              warning={warning[id]}
              setSampleZones={setSampleZones}
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
              getValues={getValues}
              key={`Zone${id}`}
            />
          ))}
        </div>
        <div className="upload-wizard__panel">
          <CustomBtn label="Back" handleClick={handleClickBack} type="button" customClass="btn__cancel" />
          <CustomBtn
            label="Next"
            handleClick={() => {}}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default SampleData;
