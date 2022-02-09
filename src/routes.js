import React, {
  useContext, useEffect, useState,
} from 'react';
import { Redirect } from 'react-router';
import * as nearAPI from 'near-api-js';
import { appStore } from './state/app';
import CreateAcc from './page/CreateAcc/CreateAcc';
import Login from './page/Login';
import RenderRoutes from './components/RenderRoutes';
import LaunchCreate from './page/LaunchCreate';
import Layout from './Layouts/Layout';
import LaunchProject from './page/LaunchProject';
import ExistingProject from './page/ExistingProject';
import Mfs from './page/Mfs';
import LayoutDash from './Layouts/LayoutDash/LayoutDash';
import ProjectPage from './page/ProjectPage';
import EditPage from './page/EditPage';
import DataUpload from './page/DataUpload/DataUpload';
import FieldAgents from './page/FieldAgents/FieldAgents';
import TermsConditions from './page/TermsConditions';
import PrivateNotice from './page/PrivateNotice';
import { contractMethods, getContract } from './utils/near-utils';
import Loader from './components/Loader/Loader';

const Terms = ({ children }) => {
  const { state } = useContext(appStore);
  const { account, app } = state;
  const { profile } = app;
  const [returnElem, setReturnElem] = useState(profile && profile.terms && children);
  useEffect(async () => {
    if (profile && profile.terms) {
      setReturnElem(children);
    } else if (account && account.accountId) {
      const contract = getContract(account, contractMethods, 0);
      const userProfile = await contract.get_profile({ account_id: account.accountId });
      if (userProfile && userProfile.terms) {
        setReturnElem(children);
      } else {
        setReturnElem(<Redirect to="/create-account" />);
      }
    }
  }, [account]);

  return returnElem || <Loader customClass="lds-ring__big" />;
};

const routes = [
  { path: '/login', key: 'ROOT', exact: true, component: () => <Login /> },
  { path: '/create-account', key: 'CREATE_ACC', exact: true, component: () => <CreateAcc /> },
  { path: '/terms-conditions', key: 'TERMS_CONDITIONS', exact: true, component: () => <TermsConditions /> },
  { path: '/private_notice', key: 'PRIVACY_NOTICE', exact: true, component: () => <PrivateNotice /> },
  {
    path: '/',
    key: 'HOME',
    component: (props) => {
      const keys = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
      let isValid = false;
      const iterableKeys = Object.keys(localStorage);
      for (const key of iterableKeys) {
        if (key.includes('near-api-js:keystore') && (key.includes('.testnet') || key.includes('.near'))) {
          isValid = true;
        }
      }
      if (keys.localStorage.length === 0 || !isValid) {
        return <Redirect to="/login" />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/',
        key: 'DASHBOARD',
        exact: true,
        component: () => (
          <Terms>
            <LayoutDash>
              <ExistingProject />
            </LayoutDash>
          </Terms>
        ),
      },
      {
        path: '/page/mfs',
        key: 'MFS',
        exact: true,
        component: () => (
          <Terms>
            <LayoutDash>
              <Mfs />
            </LayoutDash>
          </Terms>
        ),
      },
      {
        path: '/project/:nameId',
        key: 'PROJECT',
        exact: true,
        component: () => (
          <Terms>
            <LayoutDash>
              <ProjectPage />
            </LayoutDash>
          </Terms>
        ),
      },
      {
        path: '/edit/:nameId',
        key: 'PROJECT',
        exact: true,
        component: () => (
          <Terms>
            <EditPage />
          </Terms>
        ),
      },
      {
        path: '/start-project',
        key: 'START_PROJECT',
        exact: true,
        component: () => (
          <Terms>
            <Layout>
              <LaunchCreate />
            </Layout>
          </Terms>
        ),
      },
      {
        path: '/create-project',
        key: 'CREATE_PROJECT',
        exact: true,
        component: () => (
          <Terms>
            <LaunchProject />
          </Terms>
        ),
      },
      {
        path: '/data-upload/:nameId',
        key: 'DATA_UPLOAD',
        exact: true,
        component: () => (
          <Terms>
            <DataUpload />
          </Terms>
        ),
      },
      {
        path: '/field-agents',
        key: 'FIELD_AGENTS',
        exact: true,
        component: () => (
          <Terms>
            <LayoutDash>
              <FieldAgents />
            </LayoutDash>
          </Terms>
        ),
      },
      {
        path: '/settings',
        key: 'SETTINGS',
        exact: true,
        component: () => (
          <Terms>
            <h1>SETTINGS</h1>
          </Terms>
        ),
      },
    ],
  },
];

export default routes;
