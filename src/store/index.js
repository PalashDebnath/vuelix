import { createStore } from 'vuex';

import show from './show';

const store = {
  state: {
    appName: 'VUELIX'
  },
  getters: {
    fetchAppName: (state) => {
      return state.appName;
    }
  },
  modules: {
    show
  }
};

export default createStore(store);
