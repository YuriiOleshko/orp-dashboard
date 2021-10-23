/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';

import { GAS, parseNearAmount } from 'src/state/near';
import { getContract, contractMethods } from 'src/utils/near-utils';
import { appStore } from 'src/state/app';
import { initIPFS } from 'src/state/ipfs';
import CustomBtn from 'src/generic/CustomBtn';
import logo from 'src/assets/image/ORPLogo.svg';
import { setting } from 'src/Layouts/Layout/LangLayot';
import {
  btnLabel, title, titlePreview, step1, step2, step3, step4,
} from './LangWizardForm';
import GenInformation from './Steps/GenInformation';
import ProjectLocation from './Steps/ProjectLocation';
import StepWizard from './Steps';
import RefoData from './Steps/RefoData';
import ProjectInit from './Steps/ProjectInit';
import Preview from './Steps/PreviewProject';
import PopupSuccess from '../PopupSuccess/PopupSuccess';
import LoaderIpfs from '../LoaderIpfs.js';

const stepForm = [step1, step2, step3, step4];

const WizardForm = () => {
  const intl = useIntl();
  const history = useHistory();
  const { state } = useContext(appStore);
  const { app, account, wallet } = state;
  const { profile } = app;
  // eslint-disable-next-line
  const getUserName = () => `${profile?.first_name} ${profile?.last_name}`;
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [defaultState, setDefaultState] = useState({ developer: intl.formatMessage(setting) });
  const [nftTxHash, setNftTxHash] = useState('');
  const [loadProfile, setProfile] = useState(false);

  useEffect(() => {
    const params = (new URL(document.location)).searchParams;
    const hash = params.get('transactionHashes');
    if (hash) {
      setNftTxHash(hash);
    }
  }, []);

  useEffect(() => {
    if (profile) setDefaultState({ ...defaultState, developer: getUserName() });
    else setDefaultState({ ...defaultState, developer: intl.formatMessage(setting) });
    setProfile(true); intl.formatMessage(setting);
  }, [profile]);

  const togglePopup = () => {
    setNftTxHash('');
  };

  const nextPage = () => {
    setStep(step + 1);
  };

  const prevPage = () => {
    setStep(step - 1);
  };

  const handleMint = async () => {
    const ipfs = await initIPFS();
    const { path } = await ipfs.add(JSON.stringify(defaultState));
    const oneMillion = 1e6;

    if (typeof path === 'string') {
      const deposit = parseNearAmount('1');
      const contract = getContract(account, contractMethods, 0);
      const stake = (defaultState.budget).toString();
      const startNanoSec = defaultState.startTimeProject * oneMillion;
      const endNanoSec = defaultState.finishTimeProject * oneMillion;
      const area = (defaultState.square * oneMillion).toString();

      // const tokenMetadata = {
      //   media: `/ipfs/${path}`,
      //   issued_at: `${Date.now()}`,
      //   updated_at: `${Date.now()}`,
      // };

      await contract.add_project({
        project_id: `id-${Date.now()}`,
        owner_id: account.accountId,
        starts_at: startNanoSec,
        ends_at: endNanoSec,
        area,
        budget: stake,
        cid: path,
        metadata: {
          title: null,
          description: null,
          media: null,
          media_hash: null,
          copies: null,
          issued_at: null,
          expires_at: null,
          starts_at: null,
          updated_at: null,
          extra: null,
          reference: null,
          reference_hash: null,
        },
      }, GAS, deposit);
    }
  };

  return (
    <>
      { nftTxHash && <PopupSuccess close={togglePopup} hash={nftTxHash} />}
      <section className="wizard">
        <div className="wizard__wrapper">
          <div>
            <div className="wizard__intro ">
              <div className="wizard__logo">
                <ReactSVG src={logo} />
              </div>

              {step < 4 ? <h2 className="wizard__title">{intl.formatMessage(title)}</h2> : <h2 className="wizard__title center">{intl.formatMessage(titlePreview)}</h2>}

              <div className="wizard__wrapper-btn">
                <CustomBtn
                  label={intl.formatMessage(btnLabel)}
                  customClass="btn__cancel"
                  handleClick={() => {
                    history.push('start-project');
                  }}
                  iconClass="icon-close"
                />
              </div>
            </div>
            {step < 4 && <StepWizard step={step} stepForm={stepForm} />}
            {loadProfile && (
              <div className="wizard__gen-wrapper">
                {state.loading && (
                  <LoaderIpfs customClass="" />
                ) }
                <GenInformation step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} />
                <ProjectLocation step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} prevPage={prevPage} />
                <RefoData step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} prevPage={prevPage} />
                <ProjectInit step={step} handleMint={handleMint} projState={defaultState} setState={setDefaultState} prevPage={prevPage} nextPage={nextPage} setShowPreview={setShowPreview} />
                <Preview state={defaultState} handleMint={handleMint} prevPage={prevPage} step={step} showPreview={showPreview} setShowPreview={setShowPreview} />
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default WizardForm;
