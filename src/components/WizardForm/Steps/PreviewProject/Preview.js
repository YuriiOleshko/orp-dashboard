import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { CSVLink } from 'react-csv';
import NumberFormat from 'react-number-format';
import {
  ste4Create, backPreview, previewFiles, step1, step1Input2, step1Input0, step1Input1, step1Input3, step1CreatorLabel, step1Input5Info, step1Input6, step1Input7, step1Input4, step2, step2Input1, step2Input2, step2CodePlus, step3, step3Input1, step3Input2, step3Input3, step3Ben, step3Area, step4Coast1, step4Coast2, step4Coast3, step4Coast4, step4TitleCoast, step3Public, step3Private, step2List,
} from '../../LangWizardForm';
import CustomBtn from '../../../CustomBtn';
import { initIPFS, getFilesFromDirectory } from '../../../../state/ipfs';
import WrapperScaleImg from '../AnotherComponents/WrapperScaleImg';

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const Preview = ({ state, prevPage, handleMint, step, showPreview, setShowPreview }) => {
  const intl = useIntl();
  const [iconHash, setIconHash] = useState('');
  const [screenHash, setScreenHash] = useState('');
  const [filesNames, setFilesNames] = useState([]);
  useEffect(async () => {
    if (showPreview) {
      const ipfs = await initIPFS();
      if (state.filesCidDir) {
        const updateArray = await getFilesFromDirectory(ipfs, state.filesCidDir);
        setFilesNames(updateArray);
      }
      if (state.cidScreenShot) {
        setScreenHash(state.cidScreenShot);
      }
      if (state.iconCidDir) {
        let count = 0;
        for await (const file of ipfs.get(state.iconCidDir)) {
          if (count === 1) {
            setIconHash(file.path);
          }
          count++;
        }
      }
    }
  }, [showPreview]);

  const chekSaveArray = (path) => {
    const privateType = state.privateFiles.find((el) => el.path === path);
    if (privateType) return privateType.private;
    return false;
  };
  const backTo = () => {
    setShowPreview(false);
    prevPage();
  };
  if (step !== 4) {
    return null;
  }
  return (
    <div className="preview">
      <div className="preview__gen">
        <div className="preview__block">
          <h3 className="preview__title">
            {intl.formatMessage(step4TitleCoast)}
          </h3>
          <div className="preview__block-wrapper">
            <div className="preview__wrapper-element cost">
              <p className="preview__field center">
                <span>
                  {intl.formatMessage(step4Coast1)}
                  {' '}
                </span>
                <span className="bold">
                  <NumberFormat value="50" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                </span>
              </p>
            </div>
            <div className="preview__wrapper-element">
              <p className="preview__field center">
                <span>
                  {intl.formatMessage(step4Coast2)}
                  {' '}
                </span>
                <span className="bold">
                  <NumberFormat value="100" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                </span>

              </p>
            </div>
            <div className="preview__wrapper-element">
              <p className="preview__field center">
                <span>
                  {intl.formatMessage(step4Coast3)}
                  {' '}
                </span>
                <span className="bold">
                  <NumberFormat value="50" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                </span>

              </p>
            </div>
            <div className="preview__wrapper-element">
              <p className="preview__field center">
                <span>
                  {intl.formatMessage(step4Coast4)}
                  {' '}
                </span>
                <span className="bold">
                  <NumberFormat value="1500" displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" />
                </span>

              </p>
            </div>
          </div>
        </div>

        <div className="preview__block">
          <h3 className="preview__title">
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
                {<NumberFormat value={state.budjet} displayType="text" thousandSeparator decimalScale={2} fixedDecimalScale suffix=" USD" /> || ''}
              </p>
            </div>

            {state.funders.map((el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="preview__funder" key={index + el + index + index}>
                <div className="preview__wrapper-element ">
                  {index === 0 && <span className="preview__label">{intl.formatMessage(step1CreatorLabel)}</span>}
                  <p className="preview__field ">
                    <span>{el.name || ''}</span>
                  </p>
                </div>
                <div className="preview__wrapper-element">
                  {index === 0 && <span className="preview__label">{intl.formatMessage(step1Input5Info)}</span>}
                  <div className="preview__wrapper-info">
                    <p className="preview__field">
                      {el.desc || ''}
                    </p>
                    <p className="preview__field">
                      {<NumberFormat value={el.part} displayType="text" fixedDecimalScale suffix="%" /> || ''}
                    </p>
                  </div>
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
          <h3 className="preview__title">
            {intl.formatMessage(step2)}
          </h3>
          <div className="preview__block-wrapper">
            {screenHash && (
              <div className="preview__wrapper-element big">
                <WrapperScaleImg cid={screenHash} />
              </div>
            )}
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

            <div className="preview__wrapper-element big">
              <span className="preview__label">{intl.formatMessage(step2Input1)}</span>
              <div className="wizard__wrapper-coor">
                {state.polygonCoordinate.length > 0 && state.polygonCoordinate[0].map((point, index) => {
                  if (index <= 8) {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className="wizard__wrapper-input" key={point[0] + index + index + index}>
                        <span className="wizard__word">
                          {alphabet[index]}
                          .
                        </span>
                        <p className="wizard__point-coord">
                          {parseFloat(point[0])
                            .toFixed(9)}
                        </p>
                        <p className="wizard__point-coord">
                          {parseFloat(point[1])
                            .toFixed(9)}
                        </p>
                      </div>
                    );
                  }
                  if (index === 9) {
                    return (
                      <CSVLink
                        data={state.polygonCoordinate[0].map((el) => [`longitude: ${el[0]}`, `latitude: ${el[1]}`])}
                        filename="Coordinate"
                        className="wizard__list-dwn"
                      >
                        {intl.formatMessage(step2List)}
                        {' '}

                      </CSVLink>
                    );
                  }
                  return null;
                }) }
              </div>
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
                    {<NumberFormat value={state.square} displayType="text" thousandSeparator /> || ''}
                  </p>
                </div>
                <div className="preview__wrapper-element">
                  <span className="preview__label">{intl.formatMessage(step3Input2)}</span>
                  <p className="preview__field ">
                    {<NumberFormat value={state.amountTrees} displayType="text" thousandSeparator /> || ''}
                  </p>
                </div>
                <div className="preview__wrapper-element">
                  <span className="preview__label">{intl.formatMessage(step3Input3)}</span>
                  <p className="preview__field  ">
                    {<NumberFormat value={state.avgTrees} displayType="text" thousandSeparator /> || ''}
                  </p>
                </div>
              </div>
              {state.benefits && (
              <div className="wizard__benefits preview__benefits ">
                <span className="preview__label">{intl.formatMessage(step3Ben)}</span>
                <div className="wizard__icon-select">
                  { state.benefits.map((el, index) => (
                    el.active && (
                    <div
                    // eslint-disable-next-line react/no-array-index-key
                      key={el.src + index + 2}
                      className={`wizard__icon-item ${el.active ? 'active' : 'def'}`}
                    >
                      <img src={el.src} alt="img" />
                    </div>
                    )
                  ))}
                </div>
              </div>
              )}
              {filesNames.length > 0 && (
              <div className="wizard__icon-file">
                <span className="preview__label">{intl.formatMessage(previewFiles)}</span>

                <ul className="preview__list">
                  {filesNames.map((file, index) => (
                    <li key={file}>
                      {index + 1}
                      .
                      {' '}
                      {file.path}
                      {' '}
                      {chekSaveArray(file.path)
                        ? (
                          <div className="wizard__file-types">
                            <span className="gray">
                              {intl.formatMessage(step3Public)}
                            </span>
                          </div>
                        ) : (
                          <div className="wizard__file-types">
                            <span className="blue">
                              {intl.formatMessage(step3Private)}
                            </span>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
              )}
              <div className="preview__wrapper-element">
                <span className="preview__label">{intl.formatMessage(step3Area)}</span>
                <p className="preview__field textarea ">
                  {state.additional || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="preview__btn-wrapper">
          <CustomBtn label={intl.formatMessage(backPreview)} handleClick={() => backTo()} type="button" customClass="btn__cancel" />
          <CustomBtn label={intl.formatMessage(ste4Create)} type="submit" handleClick={handleMint} customClass="btn__next" />
        </div>
      </div>
    </div>
  );
};

export default Preview;
