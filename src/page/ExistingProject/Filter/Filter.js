/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import Select, { components } from 'react-select';
import { useIntl } from 'react-intl';
import { appStore } from 'src/state/app';

import CustomInput from 'src/generic/CustomInput/CustomInput';
// import CustomSelect from 'src/generic/CustomSelect/CustomSelect';

import {
  projectPlaceholder,
  projectLabel,
  locationPlaceholder,
  locationLabel,
  stagePlaceholder,
  stageLabel,
} from './LangFilter';

const CustomSelect = ({ placeholder, labelText, options, selectOnChange }) => {
  const customStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      padding: 4,
      fontSize: 14,
      color: '#4d4d4d',
      borderRadius: 6,
      borderColor: isFocused ? '#dfdfdf' : '#dfdfdf',
      boxShadow: isFocused ? 0 : 0,
      '&:hover': {
        borderColor: isFocused ? '#dfdfdf' : '#dfdfdf',
      },
    }),
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
      padding: 0,
      filter: 'drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.05))',
      zIndex: 2,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused ? '#D5F3FB' : 'white',
      color: '#4d4d4d',
      fontSize: 14,
      paddingLeft: 18,
    }),
    placeholder: (styles) => ({
      ...styles,
    }),
    multiValue: (styles) => ({
      ...styles,
      border: '1px solid #2EC3E9',
      backgroundColor: 'transparent',
      borderRadius: 8,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#2EC3E9',
      fontSize: 12,
      fontWeight: 700,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#2EC3E9',
      '&:hover': {
        cursor: 'pointer',
        color: '#2EC3E9',
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
    }),
    clearIndicator: (styles) => ({
      ...styles,
      padding: 0,
    }),
  };

  const projectStyles = {
    ...customStyles,
    control: (styles, { isFocused }) => ({
      ...styles,
      padding: 4,
      fontSize: 14,
      color: '#4d4d4d',
      borderRadius: 6,
      borderColor: isFocused ? '#dfdfdf' : '#dfdfdf',
      boxShadow: isFocused ? 0 : 0,
      '&:hover': {
        borderColor: isFocused ? '#dfdfdf' : '#dfdfdf',
      },
      borderWidth: 0,
    }),
    clearIndicator: (styles) => ({
      ...styles,
      padding: 0,
    }),
  };

  return (
    <div className="select-wrapper">
      <span className="select-header">{labelText}</span>
      <Select
        isClearable
        closeMenuOnSelect
        placeholder={placeholder}
        options={options}
        styles={projectStyles}
        onChange={(e) => selectOnChange(e?.value)}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

const stagesOptions = Array.from({ length: 51 }).map((el, index) => ({
  value: index,
  label: `${index}`,
}));

const Filter = ({ setFilterParams, sortType }) => {
  const { state, update } = useContext(appStore);
  const { account, app } = state;
  const intl = useIntl();
  const [projectValue, setProjectValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [stage, setStage] = useState(null);

  useEffect(() => {
    const paramsObj = {
      signer_id: account.accountId,
      name: projectValue,
      region: locationValue,
      currentStage: stage,

      [sortType.type]: sortType.value ? sortType.value : '',
      // parsedSquare: sortType.type === 'parsedSquare' ? sortType.value : '',
      // deadline: sortType.type === 'deadline' ? sortType.value : '',
    };
    const paramsArr = Object.keys(paramsObj);
    const queryObj = {
      bool: {
        must: [],
      },
    };
    const sortArr = [];

    paramsArr.forEach((key) => {
      if (paramsObj[key] && key === 'signer_id') {
        queryObj.bool.must.push({
          match: {
            [key]: paramsObj[key],
          },
        });
      }
      if (paramsObj[key] && (key === 'name' || key === 'region')) {
        queryObj.bool.must.push({
          wildcard: {
            [key]: {
              value: `${paramsObj[key]}*`,
              case_insensitive: true,
            },
          },
        });
      }
      if (typeof paramsObj[key] === 'number' && key === 'currentStage') {
        queryObj.bool.must.push({
          match: {
            [key]: paramsObj[key],
          },
        });
      }
      if (paramsObj[key] && (key === 'parsedSquare' || key === 'deadline')) {
        sortArr.push({ [key]: paramsObj[key] });
      }
    });

    setFilterParams((prev) => ({
      ...prev,
      sort: [...sortArr],
      query: {
        ...queryObj,
      },
    }));
  }, [
    projectValue,
    locationValue,
    stage,
    sortType,
  ]);

  return (
    <>
      <CustomInput
        type="text"
        label={intl.formatMessage(projectLabel)}
        placeholder={intl.formatMessage(projectPlaceholder)}
        change={(e) => setProjectValue(e.target.value)}
        customClass="filter-name"
      />
      <CustomInput
        type="text"
        label={intl.formatMessage(locationLabel)}
        placeholder={intl.formatMessage(locationPlaceholder)}
        change={(e) => setLocationValue(e.target.value)}
        customClass="filter-location"
      />
      <CustomSelect
        placeholder={intl.formatMessage(stagePlaceholder)}
        labelText={intl.formatMessage(stageLabel)}
        options={stagesOptions}
        selectOnChange={setStage}
      />
    </>
  );
};

export default Filter;
