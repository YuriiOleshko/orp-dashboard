import {
  makeObservable,
  observable,
  action,
  runInAction,
} from 'mobx';
import { initNearConnection } from '../../api';

class NearStore {
  constructor() {
    this.currentUser = {};
    this.nearConfig = {};
    this.walletConnection = {};
    this.contract = {};
    makeObservable(this, {
      currentUser: observable.ref,
      nearConfig: observable.ref,
      walletConnection: observable.ref,
      contract: observable.ref,
      initNear: action,
      signIn: action,
      signOut: action,
    });
  }

   initNear = async () => {
     const newStore = await initNearConnection();
     const { nearConfig, currentUser, walletConnection, contract } = newStore;
     runInAction(() => {
       this.nearConfig = nearConfig;
       this.walletConnection = walletConnection;
       this.currentUser = currentUser;
       this.contract = contract;
     });
   }

   signIn = () => {
     this.walletConnection.requestSignIn();
   };

   signOut = () => {
     this.walletConnection.signOut();
     window.location.replace(window.location.origin + window.location.pathname);
     this.currentUser = {};
     this.nearConfig = {};
     this.walletConnection = {};
   };

   // getUserInfo = async () => {
   //   try {
   //     const userData = await this.contract.get_data();
   //   } catch (e) {
   //     console.log('Error: ', e);
   //   }
   // }

   setUserInfo = async (data) => {
     try {
       await this.contract.insert_data({ value: JSON.stringify(data) });
     } catch (e) {
       console.log('Error: ', e);
     }
   }
}

export default new NearStore();
