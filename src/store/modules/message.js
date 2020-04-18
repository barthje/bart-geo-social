import messageService from '../../services/messageService';
export const namespaced = true;

export const state = {
  messages: [],
};

export const getters = {
  messages: state => state.messages,
};

export const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
};

export const actions = {
  getMessages({ commit }, uid) {
    return messageService.getByUserId(uid).onSnapshot(querySnapshot => {
      const messages = [];

      querySnapshot.forEach(document => {
        messages.push({
          id: document.id,
          ...document.data(),
        });
      });

      commit('SET_MESSAGES', messages);
    });
  },
};
