/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, {
  useState, useEffect, useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { appStore } from 'src/state/app';
import { getJSONFileFromIpfs, initIPFS } from 'src/state/ipfs';
// eslint-disable-next-line import/no-unresolved
import CustomInput from 'src/generic/CustomInput';
// eslint-disable-next-line import/no-unresolved
import CustomBtn from 'src/generic/CustomBtn';
import SampleZoneItem from 'src/components/DataUploadWizard/components/SampleZoneItem';
import PreviewSapmleZone from 'src/components/DataUploadWizard/components/PreviewSampleZone/PreviewSampleZone';
import WrapperScaleImg from '../../../WrapperScaleImg/WrapperScaleImg';

const AGENT_API = process.env.REACT_APP_AGENT_API;

const SampleData = ({ totalData, setTotalData, nextPage, prevPage, currentStage }) => {
  const { register, handleSubmit, errors, clearErrors, control, setValue, getValues } = useForm();
  const { state } = useContext(appStore);
  const { account } = state;
  const history = useHistory();
  const { nameId } = useParams();

  const currSubZone = { ...totalData.subZonesPolygon[currentStage] };
  const currentSampleZones = [...currSubZone.sampleZones];
  // const sZones = currentSampleZones.map((el, index) => ({
  //   ...el,
  //   sampleName: `S${index + 1}`,
  //   coordinates: el.geometry.coordinates,
  //   sampleTrees: el.sampleTrees.length ? el.sampleTrees : Array.from({ length: 10 }).map((e, i) => ({
  //     id: Date.now() + i,
  //     treeName: `S${index + 1}_T${i + 1}`,
  //     status: 'damaged',
  //     height: '250',
  //     diameter: '100',
  //     treePhoto: '/ipfs/QmeAkTfuybkK3DTWL9NC5SB4TfprfVTVbxEbvwoysgJF44',
  //     labelPhoto: '/ipfs/QmeAkTfuybkK3DTWL9NC5SB4TfprfVTVbxEbvwoysgJF44',
  //   })),
  // }));
  const sZones = currentSampleZones.map((el) => ({
    ...el,
  }));
  const [currentSubZone, setCurrentSubZone] = useState(currSubZone);
  const [sampleZones, setSampleZones] = useState(sZones);
  const [warning, setWarning] = useState([]);

  useEffect(async () => {
    if (account && account.accountId) {
      const ipfs = await initIPFS();

      const sampleZonesFromApp = await Promise.all(
        sampleZones.map(async (item) => {
          const result = await fetch(
            `${AGENT_API}/list?stage-id=${currentStage}&sample-zone=${item.id}`,
            {
              headers: {
                Authorization: `Bearer ${account.accountId}`,
              },
            },
          ).then((data) => data.json());

          if (result.length) {
            const cid = Object.values(result[0].projects)[0][0].cid;
            const treesJSON = await getJSONFileFromIpfs(ipfs, cid) || [];
            const parsedTreeJSON = treesJSON.map((tree, id) => {
              const treeName = Object.keys(tree)[0];
              const treeInfo = Object.values(tree)[0];
              return {
                id: Date.now() + id,
                treeName,
                status: treeInfo.select.toLowerCase(),
                height: treeInfo.height,
                diameter: treeInfo.diametr,
                treePhoto: treeInfo.treeImage,
                labelPhoto: treeInfo.treeLabel,
              };
            });
            return { ...item, sampleTrees: parsedTreeJSON };
          }
          return item;
        }),
      );
      setSampleZones(sampleZonesFromApp);
    }
  }, [account]);

  const onSubmit = () => {
    const errorZones = sampleZones.map((item) => ({ missingLength: item.sampleTrees.length < 10 }));
    const hasError = errorZones.find((item) => item.missingLength);
    if (hasError) {
      setWarning(errorZones);
      return;
    }
    const updSubZones = [...totalData.subZonesPolygon];
    const lastSubZone = updSubZones.pop();
    lastSubZone.sampleZones = sampleZones;
    updSubZones.push(lastSubZone);
    setTotalData({ ...totalData, subZonesPolygon: updSubZones });
    nextPage();
  };

  // useEffect(() => {
  //   setTotalData({ ...totalData });
  // }, [sampleZones]);

  const handleClickBack = () => {
    const subZoneExist = totalData.subZonesPolygon.find((item) => item?.stage === currentStage);
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
            <span>Number of Sampling Zones</span>
            <p className="upload-wizard__input-value">{sampleZones.length}</p>
          </div>
        </div>
        <div className="upload-wizard__map">
          <WrapperScaleImg cid={currentSubZone.cidSampleScreenShot} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="upload-wizard__sz-list">
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
        </div> */}
        <div className="upload-wizard__sz-list">
          {sampleZones.map((zone, id) => (
            <PreviewSapmleZone
              sampleName={zone.sampleName}
              coordinates={zone.coordinates}
              sampleTrees={zone.sampleTrees}
              warning={warning[id]}
              key={`${zone.sampleName}${zone.index}`}
            />
          ))}
        </div>
        <div className="upload-wizard__panel">
          <CustomBtn label="Back to list" handleClick={handleClickBack} type="button" customClass="btn__cancel" />
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
