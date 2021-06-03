import React, {
  useContext, useEffect, useState,
} from 'react';
import { useIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import {
  useHistory, useLocation, useParams,
} from 'react-router';
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import {
  // eslint-disable-next-line no-unused-vars
  editBtnUpdt, btnLabel, ste4Create, editTitleCost, step1, step1Creator, step1Input0, step1Input1, step1Input1Place, step1Input2, step1Input2Place, step1Input3, step1Input4, step1Input4Place, step1Input5Info, step1Input6, step1Input7, step2, step2CodePlus, step2Input1, step2Input2, step2List, step3, step3Area, step3AreaPlace, step3Ben, step3Input1, step3Input2, step3Input3, step3Input5, step3Private, step3Public, step3TooltipFiles, step3TooltipTextArea, step4Coast1, step4Coast2, step4Coast3, step4Coast4, step4PointDai, step4PointSlope, step4TitleCoast, step4TitleTime, step4Tooltip1, step4Tooltip2, step4Tooltip3, step4Tooltip4, ste4Phase, editLabelBtn, ste4Month,
} from '../../components/WizardForm/LangWizardForm';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import CustomBtn from '../../components/CustomBtn';
import FunderInfo from '../../components/WizardForm/Steps/AnotherComponents/FunderInfo';
import DropzoneInput from '../../components/WizardForm/Steps/AnotherComponents/DropzoneInput';
import buble from '../../assets/image/wizard/buble.svg';
import Benefits from '../../components/WizardForm/Steps/AnotherComponents/Benefits';
import { appStore } from '../../state/app';
import LoaderIpfs from '../../components/LoaderIpfs.js';
import Loader from '../../components/Loader';
import Chart from '../../components/WizardForm/Steps/AnotherComponents/Chart';
import { getJSONFileFromIpfs, initIPFS } from '../../state/ipfs';
import UpdatedFiles from './UpdatedFiles';
import { noDublicateElements } from '../../utils/convert-utils';
import {
  GAS, ipfsURL, parseNearAmount,
} from '../../state/near';
import { getNftContract, nftContractMethods } from '../../utils/near-utils';
import PopupSuccess from '../../components/WizardForm/Steps/AnotherComponents/PopupSuccess';

const options = [{ label: 'Trees', value: 'Trees' }, { label: 'Reserves', value: 'Reserves' }, { label: 'Forest', value: 'Forest' }];

const EditPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { nameId } = useParams();
  const intl = useIntl();
  const { state, update } = useContext(appStore);
  const { account } = state;
  const data = location.state;
  const dataChart = [
    {
      name: `${intl.formatMessage(ste4Phase)} 1 (3 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 50,
      'Data Upload Fee, USD': 150,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 2 (3 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 40,
      'Data Upload Fee, USD': 125,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 3 (6 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 30,
      'Data Upload Fee, USD': 100,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (12 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 20,
      'Data Upload Fee, USD': 75,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (13 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 10,
      'Data Upload Fee, USD': 50,
    },
  ];
  const updateDataChart = [
    {
      name: `${intl.formatMessage(ste4Phase)} 1 (3 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 50,
      'Data Upload Fee, USD': 150,
      cnt: 490,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 2 (3 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 40,
      'Data Upload Fee, USD': 125,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 3 (6 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 30,
      'Data Upload Fee, USD': 100,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (12 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 20,
      'Data Upload Fee, USD': 75,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 4 (13 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 10,
      'Data Upload Fee, USD': 50,
    },
    {
      name: `${intl.formatMessage(ste4Phase)} 5 (12 ${intl.formatMessage(ste4Month)})`,
      'Data Upload Fee Slope, %': 8,
      'Data Upload Fee, USD': 40,
    },
  ];
  // this states for edit inputs and fields
  const privateArray = data?.privateFiles || [];
  const [avgTrees, setAvgTrees] = useState({ avgTrees: data?.avgTrees || '' });
  const [initState, setInitState] = useState({});
  const { errors, register, control, handleSubmit } = useForm();
  const [updatedFiles, setUpdatedFiles] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [countStep, setCountStep] = useState(0);
  const [loadingData, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [convertFiles, setConvertFiles] = useState([]);
  const [fileIcon, setFileIcon] = useState({});
  const [inputsArray, setInputArray] = useState([{ name: '', desc: '', part: '' }]);
  const [myFile, setMyFile] = useState([]);
  const [previewImg, setPreviewImg] = useState('');
  const [isActiveWarning, setIsActiveWarning] = useState(false);
  const [inputElement, setInputElement] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [updtCidFiles, setUpdtCidFiles] = useState('');
  const [additional, setAdditional] = useState({});
  const [benefits, setBenefits] = useState({});
  const [filesSave, setFilesSave] = useState(privateArray);
  const [newFilesSave, setNewFilesSave] = useState([]);

  const [isDisabledBtn, setIsDisabledBtn] = useState(false);
  const [myFiles, setMyFiles] = useState([]);
  const [files, setFiles] = useState({});
  const [dataCost, setDataCost] = useState({ costs: [50, 150, 150, 1500], dataChart, widthChart: 800 });
  const [nftTxHash, setNftTxHash] = useState('');

  const countSumOfParts = (funders) => {
    const parts = funders.map((item) => +Object.values(item)[Object.values(item).length - 1]);
    const sumOfParts = parts.reduce((sum, curr) => sum + curr, 0);
    if (sumOfParts > 100) {
      setIsActiveWarning(true);
      setIsDisabledBtn(true);
    } else {
      setIsActiveWarning(false);
      setIsDisabledBtn(false);
    }
  };

  const togglePopup = () => {
    setNftTxHash('');
  };

  const handleChange = (ev, type, count, typeInput) => {
    const updArray = inputsArray.slice(0);
    if (typeInput) {
      if ((+ev.value) >= 100) {
        updArray[count][type] = 100;
        inputElement.value = '100';
      } else {
        updArray[count][type] = ev.value;
      }
      countSumOfParts(updArray);
    } else updArray[count][type] = ev.target.value;
    setInputArray(updArray);
  };

  const createInput = (count) => {
    setCountStep(count);
    const updArray = inputsArray.slice(0);
    updArray.push({ [`FunderName${count}`]: '', [`FunderInfo${count}`]: '', [`FunderPart${count}`]: '' });
    setInputArray(updArray);
  };

  const deleteInput = (count) => {
    setCountStep(count - 1);
    const updArray = inputsArray.slice(0);
    updArray.splice(count, 1);
    setInputArray(updArray);
    countSumOfParts(updArray);
  };
  const changeAvgTrees = (ev) => {
    if (ev.value) setAvgTrees({ avgTrees: Math.floor((+ev.value) / initState.square) });
    else setAvgTrees({ avgTrees: '' });
  };

  const recalculateDataCost = async () => {
    const newStep = dataCost.costs.map((el, index) => el + 10 * index);
    setDataCost({ costs: newStep, dataChart: updateDataChart, widthChart: (updateDataChart.length * 160) });
  };

  const changeData = (dataProject) => {
    setStartDate(dataProject.startTimeProject);
    setEndDate(dataProject.finishTimeProject);
    if (dataProject.funders.length > 0)setInputArray(dataProject.funders);
  };

  useEffect(async () => {
    const params = (new URL(document.location)).searchParams;
    const hash = params.get('transactionHashes');
    if (hash) {
      setNftTxHash(hash);
    }
    if (data) {
      changeData(data);
      setLoading(false);
      setInitState({ ...data });
    } else if (account) {
      const ipfs = await initIPFS();
      const contract = getNftContract(account, nftContractMethods);
      const token = await contract.nft_token({ token_id: nameId });
      if (token) {
        console.log(token);
        const file = await getJSONFileFromIpfs(ipfs, token.metadata.media);
        changeData(file);
        setInitState(file);
        setLoading(false);
        return;
      }
      history.push('/404');
    }
  }, [account]);

  useEffect(async () => {
    if (!loadingData) {
      const ipfs = await initIPFS();
      if (initState.iconCidDir) {
        let count = 0;
        for await (const file of ipfs.get(initState.iconCidDir)) {
          if (count === 1) {
            setPreviewImg(`${ipfsURL}/ipfs/${file.path}`);
          }
          count++;
        }
      }
    }
  }, [loadingData]);

  const handleMintUpdate = async (dataProject) => {
    const ipfs = await initIPFS();
    const { path } = await ipfs.add(JSON.stringify(dataProject));

    if (typeof path === 'string') {
      const deposit = parseNearAmount('1');
      const contract = getNftContract(account, nftContractMethods);

      const tokenMetadata = {
        media: `/ipfs/${path}`,
        updated_at: `${Date.now()}`,
      };

      await contract.nft_update_token_metadata({
        token_id: nameId,
        metadata: tokenMetadata,
      }, GAS, deposit);
    }
  };

  const updateInitState = async (newData, isFiles = false) => {
    const copyData = { ...newData };

    const { budget, funders } = copyData;
    const updBudjet = budget.replace(/(\$|,|\.00)/g, '');
    const updFunders = funders.filter((item) => (Object.values(item).some((el) => el))).map((item) => ({ ...item, part: +((`${item.part}`).replace(/\D/g, '')) }));
    const updData = { ...copyData, budget: updBudjet, funders: updFunders };
    const fromDate = {
      startTimeProject: Number.isInteger(startDate) ? startDate : Date.parse(startDate),
    };
    const toDate = {
      finishTimeProject: Number.isInteger(endDate) ? endDate : Date.parse(endDate),
    };
    const updAmountTrees = copyData.amountTrees.replace(/\D/g, '');
    const updDataTrees = { amountTrees: updAmountTrees };
    const privateFiles = { privateFiles: noDublicateElements(filesSave, newFilesSave, 'path') };
    const newInitState = { ...initState, ...updData, ...updDataTrees, ...additional, ...benefits, ...files, ...avgTrees, ...privateFiles, ...fromDate, ...toDate, ...details, ...fileIcon };
    setInitState({ ...newInitState });
    if (!isFiles)handleMintUpdate(newInitState);
  };

  const onSubmit = async (updtData) => {
    if (convertFiles.length > 0) {
      let currentlyFiles;
      if (updatedFiles.files) currentlyFiles = noDublicateElements(updatedFiles.files, convertFiles, 'content');
      else currentlyFiles = [...convertFiles];
      const ipfs = await initIPFS();
      const addOptions = {
        pin: true,
        wrapWithDirectory: true,
        timeout: 10000,
      };
      update('loading', true);
      for await (const result of ipfs.addAll(currentlyFiles, addOptions)) {
        if (!result.path) {
          updateInitState(updtData, true);
          setUpdtCidFiles({ filesCidDir: `/ipfs/${result.cid.string}` });
        }
      }
      update('loading', false);
      return true;
    }
    updateInitState(updtData);
  };

  useEffect(async () => {
    if (updtCidFiles) {
      setInitState({ ...initState, ...updtCidFiles });
      await handleMintUpdate({ ...initState, ...updtCidFiles });
    }
  }, [updtCidFiles]);
  return (
    <div className="preview">
      { nftTxHash && <PopupSuccess close={togglePopup} hash={nftTxHash} />}
      {loadingData ? <div className="dashboard__loader"><Loader /></div>
        : (
          <form className="preview__gen" onSubmit={handleSubmit(onSubmit)}>
            {state.loading && (
            <LoaderIpfs customClass="edit" />
            )}
            <div className="preview__block">
              <h3 className="preview__title">
                {intl.formatMessage(step1)}
              </h3>
              <div className="preview__block-wrapper">
                <div className="preview__step1-wrapper">
                  <div className="preview__wrapper-element">
                    <CustomInput
                      type="text"
                      label={intl.formatMessage(step1Input2)}
                      placeholder={intl.formatMessage(step1Input2Place)}
                      register={register({ required: 'This is required', maxLength: 100 })}
                      required
                      error={errors.developer}
                      value={initState.developer}
                      name="developer"
                    />
                  </div>
                  <div className="preview__wrapper-element">
                    <CustomSelect
                      label={intl.formatMessage(step1Input0)}
                      register={register({ required: 'This is required' })}
                      value={initState.type}
                      required
                      error={errors.type}
                      name="type"
                      optionArray={options}
                    />
                  </div>
                  <div className="preview__wrapper-element">
                    <CustomInput
                      type="text"
                      label={intl.formatMessage(step1Input1)}
                      placeholder={intl.formatMessage(step1Input1Place)}
                      register={register({ required: 'This is required', maxLength: 100 })}
                      required
                      change={() => {}}
                      error={errors.name}
                      value={initState.name}
                      name="name"
                    />
                  </div>
                </div>
                <div className="wizard__duration">
                  <span className="preview__label">{intl.formatMessage(step1Input3)}</span>
                  <div className="wizard__wrapper-input">
                    <div className="preview__wrapper-element">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        startDate={startDate}
                        endDate={endDate}
                        className="date-picker"
                      />
                    </div>
                    <div className="preview__wrapper-element">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="date-picker"
                      />
                    </div>
                  </div>
                </div>
                <div className="preview__wrapper-element">
                  <CustomInput
                    control={control}
                    rules={{ required: true }}
                    label={intl.formatMessage(step1Input4)}
                    placeholder={intl.formatMessage(step1Input4Place)}
                    required
                    error={errors.budget}
                    value={initState.budget}
                    name="budget"
                    usdMask
                    prefix="$"
                    decimal
                  />
                </div>

                <div className="wizard__funders-wrapper">
                  <div className="wizard__create" onClick={() => createInput(countStep + 1)}>
                    <i className="icon-plus-cir" />
                    <span>{intl.formatMessage(step1Creator)}</span>
                  </div>
                </div>
                <div className="wizard__funders-data">
                  {inputsArray.length > 0 && inputsArray.map((el, index) => (
                    <FunderInfo
                  // eslint-disable-next-line react/no-array-index-key
                      key={`${index}FundersName${index}`}
                      inputsArray={inputsArray}
                      intl={intl}
                      count={index}
                      change={handleChange}
                      registerInfo={register({ maxLength: 100 })}
                      registerName={register({ maxLength: 100 })}
                      registerPart={register({ maxLength: 3 })}
                      deleteInput={deleteInput}
                      control={control}
                      setInputElement={setInputElement}
                      warning={isActiveWarning}
                    />
                  ))}
                  {isActiveWarning && (
                  <div className="wizard__funder-warning">
                    <span className="wizard__funder-warning-text">Total sum of percents is more than 100%, please enter correct values.</span>
                  </div>
                  )}
                </div>
                <div className="preview__icon-file">
                  <span className="preview__label">{intl.formatMessage(step1Input6)}</span>
                  <div className="wizard__icon-file">
                    <DropzoneInput classCutom="" change={setFileIcon} state={initState} myFiles={myFile} setMyFiles={setMyFile} previewImg={previewImg} setPreviewImg={setPreviewImg} />
                  </div>
                </div>
                <div className="preview__wrapper-element textarea">
                  <label className="input__label ">{intl.formatMessage(step1Input7)}</label>
                  <textarea name="GenInfo" placeholder={intl.formatMessage(step1Input2Place)} defaultValue={initState.details} value={details.details} onChange={(ev) => setDetails({ details: ev.target.value })} />
                </div>
              </div>
            </div>
            <div className="preview__block">
              <div className="preview__block">
                <h3 className="preview__title">
                  {intl.formatMessage(step3)}
                </h3>
                <div className="preview__block-wrapper more">
                  <div className="preview__step1-wrapper">
                    <div className="preview__wrapper-element">
                      <span className="preview__label">{intl.formatMessage(step3Input1)}</span>
                      <p className="preview__field ">
                        {<NumberFormat value={initState.square} displayType="text" thousandSeparator /> || ''}
                      </p>
                    </div>
                    <div className="preview__wrapper-element no-margin">
                      <CustomInput
                        control={control}
                        rules={{ required: true }}
                        label={intl.formatMessage(step3Input2)}
                        placeholder={intl.formatMessage(step3Input2)}
                        required
                        change={changeAvgTrees}
                        error={errors.amountTrees}
                        value={initState.amountTrees}
                        name="amountTrees"
                        usdMask
                      />
                    </div>
                    <div className="preview__wrapper-element">
                      <span className="preview__label">{intl.formatMessage(step3Input3)}</span>
                      <p className="preview__field  ">
                        {<NumberFormat value={avgTrees.avgTrees} displayType="text" thousandSeparator /> || ''}
                      </p>
                    </div>
                  </div>
                  <div className="wizard__benefits">
                    <span className="input__label">{intl.formatMessage(step3Ben)}</span>
                    <Benefits save={setBenefits} state={initState} />

                  </div>
                  <UpdatedFiles state={initState} loadingData={loadingData} privateFiles={filesSave} setPrivateFiles={setFilesSave} setUpdatedFiles={setUpdatedFiles} updatedFiles={updatedFiles} />
                  <div className="wizard__icon-file">
                    <div className="wizard__wrapper-tooltip">
                      {' '}
                      <div className="wizard__tooltip-point" data-tip data-for="step3-tooltip-files">
                        <ReactSVG src={buble} />
                      </div>
                      <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step3-tooltip-files" effect="float">
                        {intl.formatMessage(step3TooltipFiles)}
                      </ReactTooltip>
                      <span className="preview__label">{intl.formatMessage(step3Input5)}</span>
                    </div>
                    <DropzoneInput classCutom="" change={setFiles} multi amountFiles={10} state={initState} filesSave={newFilesSave} setFilesSave={setNewFilesSave} myFiles={myFiles} setMyFiles={setMyFiles} edit convertFiles={convertFiles} setConvertFiles={setConvertFiles} />
                  </div>
                  <div className="preview__wrapper-element">
                    <div className="wizard__textarea">
                      <label className="preview__label ">{intl.formatMessage(step3Area)}</label>
                      <textarea name="GenInfo" placeholder={intl.formatMessage(step3AreaPlace)} defaultValue={initState.additional} value={additional.additional} onChange={(ev) => setAdditional({ additional: ev.target.value })} />
                      <div className="wizard__tooltip-point refo" data-tip data-for="step3-tooltip-area">
                        <ReactSVG src={buble} />
                      </div>
                      <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step3-tooltip-area" effect="float">
                        {intl.formatMessage(step3TooltipTextArea)}
                      </ReactTooltip>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="preview__btn-wrapper center">
              <CustomBtn label={intl.formatMessage(editLabelBtn)} handleClick={() => recalculateDataCost()} customClass="btn" />
            </div>
            <div className="preview__block">
              <div className="preview__block">
                <h3 className="preview__title">
                  {intl.formatMessage(editTitleCost)}
                </h3>
                <div className="preview__block-wrapper ">
                  <div className="wizard__cost-list">
                    <div className="wizard__cost-item">
                      <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-1">
                        <ReactSVG src={buble} />
                      </div>
                      <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-1" effect="float">
                        {intl.formatMessage(step4Tooltip1)}
                      </ReactTooltip>
                      <span>{intl.formatMessage(step4Coast1)}</span>
                      <span className="bold">
                        <NumberFormat value={dataCost.costs[0]} displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                      </span>
                    </div>
                    <div className="wizard__cost-item">
                      <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-2">
                        <ReactSVG src={buble} />
                      </div>
                      <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-2" effect="float">
                        {intl.formatMessage(step4Tooltip2)}
                      </ReactTooltip>
                      <span>{intl.formatMessage(step4Coast2)}</span>
                      <span className="bold">
                        <NumberFormat value={dataCost.costs[1]} displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                      </span>
                    </div>
                    <div className="wizard__cost-item">
                      <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-3">
                        <ReactSVG src={buble} />
                      </div>
                      <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-3" effect="float">
                        {intl.formatMessage(step4Tooltip3)}
                      </ReactTooltip>
                      <span>{intl.formatMessage(step4Coast3)}</span>
                      <span className="bold">
                        <NumberFormat value={dataCost.costs[2]} displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                      </span>
                    </div>
                  </div>
                  <div className="wizard__chart">
                    <div className="wizard__panel-chart">
                      <h3 className="wizard__cost-title">{intl.formatMessage(step4TitleTime)}</h3>
                    </div>
                    <div className="wizard__wrapper-chart">
                      <Chart data={dataCost.dataChart} width={dataCost.widthChart} />
                      <div className="wizard__point-words">
                        <span className="green">{intl.formatMessage(step4PointDai)}</span>
                        <span className="blue">{intl.formatMessage(step4PointSlope)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="wizard__total-block">
                    <div className="wizard__cost-item">
                      <div className="wizard__tooltip-point" data-tip data-for="step4-tooltip-4">
                        <ReactSVG src={buble} />
                      </div>
                      <ReactTooltip className="wizard__tooltip" place="top" width={300} type="light" id="step4-tooltip-4" effect="float">
                        {intl.formatMessage(step4Tooltip4)}
                      </ReactTooltip>
                      <span>{intl.formatMessage(step4Coast4)}</span>
                      <span className="bold">
                        <NumberFormat value={dataCost.costs[3]} displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="preview__btn-wrapper">
              <CustomBtn label={intl.formatMessage(btnLabel)} handleClick={() => history.push({ pathname: `/project/${nameId}`, state: initState })} type="button" customClass="btn__cancel" />
              <CustomBtn disabled={isDisabledBtn} label={intl.formatMessage(editBtnUpdt)} type="submit" handleClick={() => {}} customClass={`btn__next ${isDisabledBtn ? 'btn__next-disabled' : ''}`} />
            </div>
          </form>
        )}
    </div>
  );
};

export default EditPage;
