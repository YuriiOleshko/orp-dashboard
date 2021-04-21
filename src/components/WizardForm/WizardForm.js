import React, {
  useEffect,
  useContext,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { ReactSVG } from 'react-svg';
import { useHistory } from 'react-router';

import { GAS, parseNearAmount } from '../../state/near';
import { getNftContract, nftContractMethods } from '../../utils/near-utils';
import { appStore } from '../../state/app';
import { initIPFS } from '../../state/ipfs';

import CustomBtn from '../CustomBtn';
import { btnLabel, title } from './LangWizardForm';
import GenInformation from './Steps/GenInformation';
import ProjectLocation from './Steps/ProjectLocation';
import StepWizard from './Steps';
import logo from '../../assets/image/ORPLogo.svg';
import RefoData from './Steps/RefoData';
import ProjectInit from './Steps/ProjectInit';
import Preview from '../../page/PreviewProject';
import { setting } from '../Layout/LangLayot';
import PopupSuccess from './Steps/AnotherComponents/PopupSuccess';

const WizardForm = () => {
  const intl = useIntl();
  const history = useHistory();
  const { state } = useContext(appStore);
  const { app, account } = state;
  const { profile } = app;
  // eslint-disable-next-line
  const getUserName = () => `${profile?.firstName} ${profile?.lastName}`;

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

    if (typeof path === 'string') {
      const deposit = parseNearAmount('1');
      const contract = getNftContract(account, nftContractMethods);

      await contract.nft_mint({
        token_id: `id-${Date.now()}`,
        metadata: path,
      }, GAS, deposit);
    }
  };
  console.log(defaultState, 'defaultState');
  return (
    <>
      { nftTxHash && <PopupSuccess close={togglePopup} hash={nftTxHash} />}
      <section className="wizard">
        <div className="wizard__wrapper">
          {!showPreview && (
            <div>
              <div className="wizard__intro ">
                <div className="wizard__logo">
                  <ReactSVG src={logo} />
                </div>
                <h2 className="wizard__title">
                  {intl.formatMessage(title)}
                </h2>
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
              <StepWizard step={step} />
              {loadProfile && (
              <div className="wizard__gen-wrapper">
                {state.loading && (
                <p className="wizard__loading">
                  <i className="icon-shield" />
                  Sending data to IPFS...
                </p>
                ) }
                <GenInformation step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} />
                <ProjectLocation step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} prevPage={prevPage} />
                <RefoData step={step} state={defaultState} setState={setDefaultState} nextPage={nextPage} prevPage={prevPage} />
                <ProjectInit step={step} handleMint={handleMint} state={defaultState} setState={setDefaultState} prevPage={prevPage} toPreview={setShowPreview} />
              </div>
              )}
            </div>
          )}
          {showPreview && <Preview state={defaultState} handleMint={handleMint} back={setShowPreview} />}
        </div>
      </section>
    </>
  );
};

export default WizardForm;
