/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  useState,
} from 'react';
import { ReactSVG } from 'react-svg';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router';
import { defineMessages } from 'react-intl';

import { GAS, parseNearAmount } from 'src/state/near';
import { getContract, contractMethods } from 'src/utils/near-utils';
import { appStore } from 'src/state/app';
import { getJSONFileFromIpfs, initIPFS } from 'src/state/ipfs';
import CustomBtn from 'src/generic/CustomBtn';
import logo from 'src/assets/image/ORPLogo.svg';
import { setting } from 'src/Layouts/Layout/LangLayot';

import PopupSuccess from '../PopupSuccess/PopupSuccess';
import LoaderIpfs from '../LoaderIpfs.js';
import MonitoringData from './components/MonitoringData/index';
import SampleData from './components/SampleData/index';
import DocumentData from './components/DocumentData/index';
import StepWizard from '../WizardForm/Steps/StepWizard';
import PreviewReport from './components/PreviewReport';
import Loader from '../Loader';

const DataUploadWizard = () => {
  const history = useHistory();
  const { state } = useContext(appStore);
  const { app, account } = state;
  const { profile } = app;

  const { nameId } = useParams();
  const location = useLocation();

  const [totalData, setTotalData] = useState({ ...location.state?.item });
  const [step, setStep] = useState(0);
  const [loadingData, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState();
  const [globalFiles, setGlobalFiles] = useState([]);
  const [globalCidFiles, setGlobalCidFiles] = useState({});

  const stepForm = [{ id: 'uploadWizard.sampleData' }, { id: 'uploadWizard.documents' }];

  const nextPage = () => {
    setStep(step + 1);
  };

  const prevPage = () => {
    setStep(step - 1);
  };

  const handleUpdateProject = async (dataProject) => {
    const ipfs = await initIPFS();
    const { path } = await ipfs.add(JSON.stringify(dataProject));

    if (typeof path === 'string') {
      const deposit = parseNearAmount('1');
      const contract = getContract(account, contractMethods, 0);
      const oneMillion = 1e6;

      const stake = (dataProject.budget * 1e2).toString();
      const startNanoSec = dataProject.startTimeProject * oneMillion;
      const endNanoSec = dataProject.finishTimeProject * oneMillion;
      const area = (dataProject.square * oneMillion).toString();

      await contract.update_project_info({
        project_id: nameId,
        starts_at: startNanoSec,
        ends_at: endNanoSec,
        area,
        budget: stake,
        cid: path,
      }, GAS, deposit);
    }
  };

  useEffect(async () => {
    if (location.state && account) {
      const { item } = location.state;
      const contract = getContract(account, contractMethods, 0);
      const resultStage = await contract.get_current_project_stage({ project_id: nameId });
      const curStage = resultStage ? resultStage.id : -1;
      setCurrentStage(curStage);
      setTotalData(item);
      setLoading(false);

      if (curStage >= 0 && item.subZonesPolygon) {
        const subZoneExist = item.subZonesPolygon.find((i) => i?.stage === curStage);
        const finished = item.subZonesPolygon.find((i) => i?.stage === curStage && i?.finished);
        if (finished) history.push('/');
        if (subZoneExist) nextPage();
      }
    } else if (account) {
      const ipfs = await initIPFS();
      const contract = getContract(account, contractMethods, 0);
      const token = await contract.get_project({ project_id: nameId });
      const resultStage = await contract.get_current_project_stage({ project_id: nameId });
      const curStage = resultStage ? resultStage.id : -1;
      if (token) {
        const file = await getJSONFileFromIpfs(ipfs, token.info.cid);
        setTotalData(file);
        setCurrentStage(curStage);
        setLoading(false);

        if (curStage >= 0 && file.subZonesPolygon) {
          const subZoneExist = file.subZonesPolygon.find((item) => item?.stage === curStage);
          const finished = file.subZonesPolygon.find((item) => item?.stage === curStage && item?.finished);
          if (finished) history.push('/');
          if (subZoneExist) nextPage();
        }
      } else {
        history.push('/404');
      }
    }
  }, [account]);

  return (
    <>
      {loadingData ? <div className="data-upload__loader"><Loader /></div>
        : (
          <section className="upload-wizard">
            <div className="upload-wizard__wrapper">
              <div>
                <div className="upload-wizard__header ">
                  <div className="upload-wizard__logo">
                    <ReactSVG src={logo} />
                  </div>
                  {currentStage >= 0 && (
                  <>
                    {step === 0 && (<h2 className="upload-wizard__title">Choose the Sub-zone you will be reforesting in this Stage</h2>)}
                    {((step >= 1) && ((step <= 2))) && (<h2 className="upload-wizard__title">Upload Stage Report</h2>)}
                    {step === 3 && (<h2 className="upload-wizard__title">Stage Report Preview</h2>)}
                  </>
                  )}
                  <div className="upload-wizard__cancel">
                    <CustomBtn
                      label="Cancel"
                      customClass="btn__cancel"
                      handleClick={() => {
                        history.push('/');
                      }}
                      iconClass="icon-close"
                    />
                  </div>
                </div>
                {step > 0 && step <= 2 && <StepWizard step={step - 1} stepForm={stepForm} />}
                {currentStage >= 0 ? (
                  <div className="upload-wizard__body">
                    {state.loading && (
                    <LoaderIpfs customClass="upload-wizard__ipfs" />
                    ) }
                    {step === 0 && (<MonitoringData totalData={totalData} setTotalData={setTotalData} nextPage={nextPage} prevPage={() => history.push('/')} currentStage={currentStage} handleUpdateProject={handleUpdateProject} />)}
                    {step === 1 && (<SampleData totalData={totalData} setTotalData={setTotalData} nextPage={nextPage} prevPage={prevPage} currentStage={currentStage} />)}
                    {step === 2 && (<DocumentData totalData={totalData} setTotalData={setTotalData} nextPage={nextPage} prevPage={prevPage} currentStage={currentStage} globalFiles={globalFiles} setGlobalFiles={setGlobalFiles} globalCidFiles={globalCidFiles} setGlobalCidFiles={setGlobalCidFiles} handleUpdateProject={handleUpdateProject} />)}
                    {step === 3 && (<PreviewReport totalData={totalData} nextPage={nextPage} prevPage={prevPage} currentStage={currentStage} handleUpdateProject={handleUpdateProject} />)}
                  </div>
                ) : <h2>First stage hasn&apos;t started yet.</h2>}
              </div>

            </div>
          </section>
        )}
    </>
  );
};

export default React.memo(DataUploadWizard);
