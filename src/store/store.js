import { createStore } from 'vuex';

// Recuperar datos del admin desde sessionStorage
const storedAdminId = sessionStorage.getItem('adminId');
const storedAdminNombre = sessionStorage.getItem('adminNombre');
const storedAdminTipo = sessionStorage.getItem('adminTipo');

const store = createStore({
  state() {
    return {
      // CLIENTE
      usuarioId: null,
      usuarioMovil: null,

      // ADMIN
      adminId: storedAdminId ? Number(storedAdminId) : null,
      adminNombre: storedAdminNombre || null,
      adminTipo: storedAdminTipo || null,
    };
  },

  mutations: {
    // CLIENTE
    SET_USUARIO_ID(state, id) {
      state.usuarioId = id;
    },
    SET_USUARIO_MOVIL(state, movil) {
      state.usuarioMovil = movil;
    },
    CLEAR_USUARIO(state) {
      state.usuarioId = null;
      state.usuarioMovil = null;
    },

    // ADMIN
    SET_ADMIN_ID(state, id) {
      state.adminId = id;
    },
    SET_ADMIN_NOMBRE(state, nombre) {
      state.adminNombre = nombre;
    },
    SET_ADMIN_TIPO(state, tipo) {
      state.adminTipo = tipo;
    },
    CLEAR_ADMIN(state) {
      state.adminId = null;
      state.adminNombre = null;
      state.adminTipo = null;
    },
  },

  actions: {
    // CLIENTE
    setUsuarioId({ commit }, id) {
      commit('SET_USUARIO_ID', id);
    },
    setUsuarioMovil({ commit }, movil) {
      commit('SET_USUARIO_MOVIL', movil);
    },
    limpiarUsuario({ commit }) {
      commit('CLEAR_USUARIO');
    },

    // ADMIN
    setAdminId({ commit }, id) {
      sessionStorage.setItem('adminId', id);
      commit('SET_ADMIN_ID', id);
    },
    setAdminNombre({ commit }, nombre) {
      sessionStorage.setItem('adminNombre', nombre);
      commit('SET_ADMIN_NOMBRE', nombre);
    },
    setAdminTipo({ commit }, tipo) {
      sessionStorage.setItem('adminTipo', tipo);
      commit('SET_ADMIN_TIPO', tipo);
    },
    clearAdmin({ commit }) {
      sessionStorage.clear(); 
      commit('CLEAR_ADMIN');
    },
  },

  getters: {
    // CLIENTE
    getUsuarioId(state) {
      return state.usuarioId;
    },
    getUsuarioMovil(state) {
      return state.usuarioMovil;
    },

    // ADMIN
    getAdminId(state) {
      return state.adminId;
    },
    getAdminNombre(state) {
      return state.adminNombre;
    },
    getAdminTipo(state) {
      return state.adminTipo;
    },
  },
});

export default store;


//CREO EL APARTADO DE ADMIN PARA NO INTERFERIR CON EL ID DEL CLIENTE 