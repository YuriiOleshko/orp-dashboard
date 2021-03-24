import React, { useContext } from 'react';
import { Context } from '../MultiLangWrapper/MultiLangWrapper';

const LangSwitcher = () => {
  const context = useContext(Context);
  const { locale, selectLanguage } = context;
  return (
    <select value={locale} onChange={selectLanguage}>
      <option value="en">English</option>
      <option value="ru">Russian</option>
    </select>
  );
};

export default LangSwitcher;
