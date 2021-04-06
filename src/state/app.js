import { StateUtils } from '../utils/state-utils';
import { initNear } from './near';
import { initIPFS } from './ipfs';

const initialState = {
  app: {
    mounted: false,
    theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
    profile: null,
    profileProject: {},
  },
  near: {
    initialized: false,
  },
};

export const { appStore, AppProvider } = StateUtils(initialState, 'app');

export const onAppMount = () => async ({ update, dispatch }) => {
  document.documentElement.classList.add(`theme-${initialState.app.theme}`);
  update('app', { mounted: true });
  await initIPFS();
  dispatch(initNear());
};
