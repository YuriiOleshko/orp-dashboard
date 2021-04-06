import React from 'react';
import { Redirect } from 'react-router';
import * as nearAPI from 'near-api-js';
import CreateAcc from './page/CreateAcc/CreateAcc';
import Login from './page/Login';
import RenderRoutes from './components/RenderRoutes';
import LaunchCreate from './page/LaunchCreate';
import Layout from './components/Layout';
import LaunchProject from './page/LaunchProject';
import CollateralStatus from './page/CollateralStatus';
import ExistingProject from './page/ExistingProject';
import LayoutDash from './components/LayoutDash/LayoutDash';

const routes = [
  { path: '/login', key: 'ROOT', exact: true, component: () => <Login /> },
  { path: '/create-account', key: 'CREATE_ACC', exact: true, component: () => <CreateAcc /> },
  {
    path: '/',
    key: 'HOME',
    component: (props) => {
      const keys = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
      if (keys.localStorage.length === 0) {
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
          <LayoutDash>
            <ExistingProject />
          </LayoutDash>
        ),
      },
      {
        path: '/start-project',
        key: 'START_PROJECT',
        exact: true,
        component: () => <Layout><LaunchCreate /></Layout>,
      },
      {
        path: '/collaterial',
        key: 'Collaterial__Status',
        exact: true,
        component: () => <LayoutDash><CollateralStatus /></LayoutDash>,
      },
      {
        path: '/create-project',
        key: 'CREATE_PROJECT',
        exact: true,
        component: () => <LaunchProject />,
      },
      {
        path: '/settings',
        key: 'SETTINGS',
        exact: true,
        component: () => <h1>SETTINGS</h1>,
      },
    ],
  },
];

export default routes;
