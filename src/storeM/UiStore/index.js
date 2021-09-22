import {
  makeAutoObservable,
  observable,
  action,
} from 'mobx';

class UiStore {
  constructor() {
    this.theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    // this.menuRoute = main;
    makeAutoObservable(this, {
      theme: observable,
      changeTheme: action,
      menuRoute: observable,
      changeMenuRoute: action,
    });
    document.documentElement.classList.add(`theme-${this.theme}`);
  }

  changeTheme(e) {
    this.theme = e.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${this.theme}`);
  }
}

export default new UiStore();
