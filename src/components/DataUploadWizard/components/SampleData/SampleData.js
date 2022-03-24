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
import { contractMethods, getContract } from 'src/utils/near-utils';
// eslint-disable-next-line import/no-unresolved
import CustomInput from 'src/generic/CustomInput';
// eslint-disable-next-line import/no-unresolved
import CustomBtn from 'src/generic/CustomBtn';
import SampleZoneItem from 'src/components/DataUploadWizard/components/SampleZoneItem';
import Loader from 'src/components/Loader/Loader';
import WrapperScaleImg from '../../../WrapperScaleImg/WrapperScaleImg';

const AGENT_API = process.env.REACT_APP_AGENT_API;

const SampleData = ({ totalData, setTotalData, nextPage, prevPage, currentStage, setEditSub }) => {
  const { register, handleSubmit, errors, clearErrors, control, setValue, getValues } = useForm();
  const { state } = useContext(appStore);
  const { account } = state;
  const history = useHistory();
  const { nameId } = useParams();

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

  const [currentSubZone, setCurrentSubZone] = useState();
  const [sampleZones, setSampleZones] = useState();
  const [warning, setWarning] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (account && account.accountId) {
      const ipfs = await initIPFS();
      const contract = getContract(account, contractMethods, 0);
      const token = await contract.get_project({ project_id: nameId });
      const projectData = await getJSONFileFromIpfs(ipfs, token.info.cid);

      const currSubZone = { ...projectData.subZonesPolygon[currentStage] };
      const currentSampleZones = [...currSubZone.sampleZones];
      const sZones = currentSampleZones.map((el) => ({
        ...el,
      }));

      const sampleZonesFromApp = await Promise.all(
        sZones.map(async (item) => {
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
            if (cid) {
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
            return { ...item, sampleTrees: [] };
          }
          return { ...item, sampleTrees: [] };
        }),
      );
      setCurrentSubZone(currSubZone);
      setSampleZones(sZones);
      setTotalData(projectData);
      setSampleZones(sampleZonesFromApp);
      setLoading(false);
    }
  }, [account]);

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
    const subZoneExist = totalData.subZonesPolygon.find((item) => item?.stage === currentStage);
    if (subZoneExist) history.push('/');
    else prevPage();
  };

  if (loading) {
    return <Loader customClass="lds-ring__big" />;
  }

  return (
    <>
      <div className="upload-wizard__monitoring">
        <div className="upload-wizard__area-info">
          <div className="upload-wizard__area">
            <span>Area, Hectares</span>
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
        <CustomBtn
          label="Edit Subzone"
          customClass="btn__edit-grey"
          iconClass="icon-pencil"
          type="button"
          handleClick={() => {
            setEditSub(true);
            prevPage();
          }}
        />
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
