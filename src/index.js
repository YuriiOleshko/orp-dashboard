import React from 'react';
import ReactDOM from 'react-dom';
import './styles/Main.scss';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
import MultiLangWrapper from './components/MultiLangWrapper';
import { AppProvider } from './state/app';

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <MultiLangWrapper>
        <Main />
      </MultiLangWrapper>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
