
import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    token: null,
    isAdmin: false,
    productoCreado: null, 
  },
  mutations: {
    setUserData(state, { userId, token, isAdmin }) {
      state.userId = userId;
      state.token = token;
      state.isAdmin = isAdmin;
    },
    clearUserData(state) {
      state.userId = null;
      state.token = null;
      state.isAdmin = false;
    },
    setProductoCreado(state, producto) {
      state.productoCreado = producto;
    },
    clearProductoCreado(state) {
      state.productoCreado = null;
    },
  },
  actions: {
    async setUserData({ commit }, { userId, token, isAdmin }) {
      commit('setUserData', { userId, token, isAdmin });
    },
    clearUserData({ commit }) {
      commit('clearUserData');
    },
    setProductoCreado({ commit }, producto) {
      commit('setProductoCreado', producto);
    },
    clearProductoCreado({ commit }) {
      commit('clearProductoCreado');
    },
  },
  getters: {
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
    getIsAdmin: (state) => state.isAdmin,
    getProductoCreado: (state) => state.productoCreado,
  },
});
