import firebaseService from '../../services/firebaseService';
export const namespaced = true;

export const state = {
  user: null,
};

export const getters = {
  user: state => state.user,
  loggedIn: state => !!state.user,
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};
export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);

    return user;
  },
  getUser({ commit }) {
    if (state.user) {
      return user;
    }

    const user = firebaseService.auth().currentUser;
    commit('SET_USER', user);

    return user;
  },
  logout({ commit }) {
    if (!state.user) {
      return;
    }

    return firebaseService
      .auth()
      .signOut()
      .then(() => {
        commit('SET_USER', null);
        location.reload();
      });
  },
};
