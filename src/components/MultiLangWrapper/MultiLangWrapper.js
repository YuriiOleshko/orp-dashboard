import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import English from 'src/lang/en-US.json';
import Russian from 'src/lang/ru.json';

export const Context = React.createContext();
const local = navigator.language;
let lang;
if (local === 'en') {
  lang = English;
} else if (local === 'ru') {
  lang = Russian;
} else {
  lang = English;
}
const MultiLangWrapper = (props) => {
  const { children } = props;
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  function selectLanguage(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
    if (newLocale === 'en') {
      setMessages(English);
    } else if (newLocale === 'ru') {
      setMessages(Russian);
    } else {
      setMessages(English);
    }
  }
  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};
export default MultiLangWrapper;
