import React, { useContext } from 'react';
import { appStore } from '../../state/app';

const ThemeSwitcher = () => {
  const { state, update } = useContext(appStore);
  const checkedTheme = state.app.theme;

  const setColor = (color: string) => {
    update('app', { theme: color });
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${color}`);
    localStorage.setItem('theme', color);
  };

  const switchTheme = (e) => {
    const color = e.target.checked ? 'dark' : 'light';
    setColor(color);
  };

  return (
    <label id="switch" className="theme-switcher">
      <input type="checkbox" onChange={(e) => switchTheme(e)} id="slider" checked={checkedTheme === 'dark'} />
      <span className="theme-switcher__slider round" />
    </label>
  );
};

export default ThemeSwitcher;
