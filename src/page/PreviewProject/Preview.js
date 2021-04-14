import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import logo from '../../assets/image/ORPLogo.svg';
import {
  btnLabel, ste4Create, backPreview, titlePreview, step1, step1Input2, step1Input0, step1Input1, step1Input3, step1CreatorLabel, step1Input5Info, step1Input6, step1Input7, step1Input4, step2, step2Input1, step2Input2, step2CodePlus, step3, step3Input1, step3Input2, step3Input3, step3Input4, step3Ben, step3Area,
} from '../../components/WizardForm/LangWizardForm';
import CustomBtn from '../../components/CustomBtn';
import PopupSuccess from '../../components/WizardForm/Steps/AnotherComponents/PopupSuccess';
import { initIPFS } from '../../state/ipfs';

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const Preview = ({ state, back }) => {
  const intl = useIntl();
  const history = useHistory();

  const [iconHash, setIconHash] = useState('');
  // const [filesHash, setFilesHash] = useState([]);
  useEffect(async () => {
    const ipfs = await initIPFS();
    if (state.iconCidDir) {
      let count = 0;
      for await (const file of ipfs.get(state.iconCidDir)) {
        console.log(file, 'file');
        if (count === 1) {
          setIconHash(file.path);
        }
        count++;
      }
    }
    // if (state.filesCidDir) {
    //   let count = 0;
    //   console.log(state.filesCidDir, 'state.filesCid22222Dir');
    //
    //   const nameArray = [];
    //   for await (const file of ipfs.get(state.filesCidDir)) {
    //     console.log(file, 'filesss');
    //
    //     if (count > 0) {
    //       nameArray.push(file.path.split('/')[1]);
    //     }
    //     count++;
    //     setFilesHash([...filesHash, nameArray]);
    //   }
    //   console.log(nameArray, 'nameArray');
    // }
  }, []);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
    document.body.classList.toggle('no-scroll');
  };
  return (
    <div className="preview">
      {showPopup && <PopupSuccess close={togglePopup} />}
      <div className="wizard__intro">
        <div className="wizard__logo">
          <ReactSVG src={logo} />
        </div>
        <h2 className="wizard__title">
          {intl.formatMessage(titlePreview)}
        </h2>
        <div className="wizard__wrapper-btn">
          <CustomBtn label={intl.formatMessage(btnLabel)} customClass="btn__cancel" handleClick={() => { history.push('start-project'); }} iconClass="icon-close" />
        </div>
      </div>
      <div className="preview__btn-wrapper">
        <CustomBtn label={intl.formatMessage(backPreview)} handleClick={() => back(false)} type="button" customClass="btn__cancel" />
        <CustomBtn label={intl.formatMessage(ste4Create)} type="submit" handleClick={() => { togglePopup(); }} customClass="btn__next" />
      </div>
      <div className="preview__gen">
        <div className="preview__block">
          <h3 className="preview__title">
            1
            .
            {' '}
            {intl.formatMessage(step1)}
          </h3>
          <div className="preview__block-wrapper">
            <div className="preview__step1-wrapper">
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step1Input2)}</span>
                <p className="preview__field">
                  {state.developer || ''}
                </p>
              </div>
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step1Input0)}</span>
                <p className="preview__field">
                  {state.type || ''}
                </p>
              </div>
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step1Input1)}</span>
                <p className="preview__field">
                  {state.name || ''}
                </p>
              </div>
            </div>
            <div className="wizard__duration">
              <span className="preview__label">{intl.formatMessage(step1Input3)}</span>
              <div className="wizard__wrapper-input">
                <div className="preview__wrapper-element">
                  <p className="preview__field">
                    { new Date(state.startTimeProject).toLocaleDateString('en-US') || ''}
                  </p>
                </div>
                <div className="preview__wrapper-element">
                  <p className="preview__field">
                    {new Date(state.finishTimeProject).toLocaleDateString('en-US') || ''}
                  </p>
                </div>
              </div>
            </div>
            <div className="preview__wrapper-element">
              <span className="preview__label">{intl.formatMessage(step1Input4)}</span>
              <p className="preview__field">
                {state.budjet || ''}
              </p>
            </div>

            {state.funders.map((el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="preview__funder" key={index + el + index}>
                <div className="preview__wrapper-element">
                  {index === 0 && <span className="preview__label">{intl.formatMessage(step1CreatorLabel)}</span>}
                  <p className="preview__field">
                    {el.name || ''}
                  </p>
                </div>
                <div className="preview__wrapper-element">
                  {index === 0 && <span className="preview__label">{intl.formatMessage(step1Input5Info)}</span>}
                  <p className="preview__field">
                    {el.desc || ''}
                  </p>
                </div>
              </div>
            ))}
            <div className="preview__icon-file">
              <span className="preview__label">{intl.formatMessage(step1Input6)}</span>
              {!iconHash ? (
                <div className="preview__icon">
                  <i className="icon-iconfile" />
                </div>
              )
                : (
                  <div className="preview__icon">
                    <img src={`https://gateway.ipfs.io/ipfs/${iconHash}`} alt="img" />
                  </div>
                )}
            </div>
            <div className="preview__wrapper-element">
              <span className="preview__label">{intl.formatMessage(step1Input7)}</span>
              <p className="preview__field textarea ">
                {state.details || ''}
              </p>
            </div>
          </div>
        </div>
        <div className="preview__block">
          <div className="preview__block">
            <h3 className="preview__title">
              2
              .
              {' '}
              {intl.formatMessage(step2)}
            </h3>
            <div className="preview__block-wrapper">
              <div className="preview__wrapper-element big">
                <span className="preview__label">{intl.formatMessage(step2Input1)}</span>
                <div className="wizard__wrapper-coor">
                  {state.polygonCoordinate.length > 0 && state.polygonCoordinate[0].map((point, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                    <div className="wizard__wrapper-input" key={point[0] + index}>
                      <span className="wizard__word">
                        {alphabet[index]}
                        .
                      </span>
                      <p className="wizard__point-coord">
                        {parseFloat(point[0]).toFixed(9)}
                      </p>
                      <p className="wizard__point-coord">
                        {parseFloat(point[1]).toFixed(9)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step2Input2)}</span>
                <p className="preview__field  small">
                  {state.region || ''}
                </p>
              </div>

              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step2CodePlus)}</span>
                <p className="preview__field small ">
                  {state.codePlus || ''}
                </p>
              </div>

            </div>
          </div>
        </div>
        <div className="preview__block">
          <div className="preview__block">
            <h3 className="preview__title">
              3
              .
              {' '}
              {intl.formatMessage(step3)}
            </h3>
            <div className="preview__block-wrapper">
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step3Input1)}</span>
                <p className="preview__field ">
                  {state.square || ''}
                </p>
              </div>
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step3Input2)}</span>
                <p className="preview__field ">
                  {state.amountTrees || ''}
                </p>
              </div>
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step3Input3)}</span>
                <p className="preview__field  ">
                  {state.avgTrees || ''}
                </p>
              </div>
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step3Input4)}</span>
                <p className="preview__field  ">
                  {state.typeTrees || ''}
                </p>
              </div>
              {state.benefits && (
              <div className="wizard__benefits preview__benefits ">
                <span className="preview__label">{intl.formatMessage(step3Ben)}</span>
                <div className="wizard__icon-select">
                  {state.benefits.length > 0 && state.benefits.map((el, index) => (
                    <div
                    // eslint-disable-next-line react/no-array-index-key
                      key={el.src + index + 2}
                      className={`wizard__icon-item ${el.active ? 'active' : 'def'}`}
                    >
                      <img src={el.src} alt="img" />
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* <div className="wizard__icon-file"> */}
              {/*  <span className="preview__label">{intl.formatMessage(step3Input5)}</span> */}
              {/*  {filesHash.length > 0 && ( */}
              {/*  <ul> */}
              {/*    {filesHash.map((file, index) => ( */}
              {/*      <li key={file}> */}
              {/*        {index + 1} */}
              {/*        . */}
              {/*        {' '} */}
              {/*        {file} */}
              {/*        {' '} */}
              {/*      </li> */}
              {/*    ))} */}
              {/*  </ul> */}
              {/*  )} */}
              {/* </div> */}
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step3Area)}</span>
                <p className="preview__field textarea ">
                  {state.additional || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
