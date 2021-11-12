import React from 'react';
import { Redirect } from 'react-router';
import * as nearAPI from 'near-api-js';
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
        path: '/page/mfs',
        key: 'MFS',
        exact: true,
        component: () => (
          <LayoutDash>
            <Mfs />
          </LayoutDash>
        ),
      },
      {
        path: '/project/:nameId',
        key: 'PROJECT',
        exact: true,
        component: () => (
          <LayoutDash>
            <ProjectPage />
          </LayoutDash>
        ),
      },
      {
        path: '/edit/:nameId',
        key: 'PROJECT',
        exact: true,
        component: () => (
          <EditPage />
        ),
      },
      {
        path: '/start-project',
        key: 'START_PROJECT',
        exact: true,
        component: () => <Layout><LaunchCreate /></Layout>,
      },
      {
        path: '/create-project',
        key: 'CREATE_PROJECT',
        exact: true,
        component: () => <LaunchProject />,
      },
      {
        path: '/data-upload/:nameId',
        key: 'DATA_UPLOAD',
        exact: true,
        component: () => <DataUpload />,
      },
      {
        path: '/field-agents',
        key: 'FIELD_AGENTS',
        exact: true,
        component: () => <LayoutDash><FieldAgents /></LayoutDash>,
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
