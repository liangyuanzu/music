import { obj2string, string2obj } from './utils';

export default {
  get: (key) => {
    const value = localStorage.getItem(key);
    return string2obj(value);
  },

  set: (key, value) => {
    const val = obj2string(value);
    localStorage.setItem(key, val);
  },
};
