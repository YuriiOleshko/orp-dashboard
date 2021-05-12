import React, { useEffect, useContext } from 'react';
import { appStore, onAppMount } from './state/app';
import RenderRoutes from './components/RenderRoutes';
import routes from './routes';

const Main = () => {
  const { dispatch } = useContext(appStore);

  const onMount = () => {
    dispatch(onAppMount());
  };

  useEffect(onMount, []);

  return (
    <RenderRoutes routes={routes} />
  );
};

export default React.memo(Main);
