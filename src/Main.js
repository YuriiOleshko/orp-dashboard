import React, { useContext, useEffect } from 'react';
import { appStore, onAppMount } from './state/app';
import RenderRoutes from './components/RenderRoutes';
import routes from './routes';

const Main = () => {
  const { state, dispatch } = useContext(appStore);

  const onMount = () => {
    dispatch(onAppMount());
  };
  console.log('Main state', state);
  useEffect(onMount, []);

  return (
    <RenderRoutes routes={routes} />
  );
};

export default Main;
