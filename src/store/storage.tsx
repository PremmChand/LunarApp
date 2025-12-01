import { MMKV } from 'react-native-mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';

let mmkv: MMKV | null = null;
let mmkvAvailable = false;

// Create MMKV only when RN is ready with error handling
export const getMMKV = () => {
  if (!mmkv) {
    try {
      mmkv = new MMKV();
      mmkvAvailable = true;
    } catch (error) {
      console.warn('MMKV initialization failed, using AsyncStorage fallback:', error);
      mmkvAvailable = false;
    }
  }
  return mmkv;
};

const reduxStorage = {
  setItem: async (key: string, value: string) => {
    try {
      if (mmkvAvailable && mmkv) {
        mmkv.set(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
      return Promise.resolve(true);
    } catch (error) {
      console.warn('Storage setItem failed:', error);
      return Promise.resolve(false);
    }
  },
  
  getItem: async (key: string) => {
    try {
      if (mmkvAvailable && mmkv) {
        const value = mmkv.getString(key);
        return Promise.resolve(value || null);
      } else {
        const value = await AsyncStorage.getItem(key);
        return Promise.resolve(value);
      }
    } catch (error) {
      console.warn('Storage getItem failed:', error);
      return Promise.resolve(null);
    }
  },
  
  removeItem: async (key: string) => {
    try {
      if (mmkvAvailable && mmkv) {
        mmkv.delete(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
      return Promise.resolve();
    } catch (error) {
      console.warn('Storage removeItem failed:', error);
      return Promise.resolve();
    }
  },
};

export default reduxStorage;



// import {MMKV} from 'react-native-mmkv';

// const  storage = new MMKV()

// const reduxStorage = { 
//     setItem:(key:string,val:any) =>{ // setItem is redux-toolkit persist method to set  values
//         storage.set(key, val); // storage.set is mmkv property to set values
//         return Promise.resolve(true)
//     },
//      getItem:(key:string,val:any) =>{
//         storage.set(key, val);
//         return Promise.resolve(true)
//     },
//      removeItem:(key:string) =>{
//         storage.delete(key);
//         return Promise.resolve()
//     },
// }

// export default reduxStorage