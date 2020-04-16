import profileService from '../../services/profileService';
export const namespaced = true;

export const state = {
  profiles: [],
  profile: null,
};

export const getters = {
  profiles: state => state.profiles,
  profile: state => state.profile,
};

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
  SET_PROFILES(state, profiles) {
    state.profiles = profiles;
  },
};
export const actions = {
  fetchProfile({ commit }, uid) {
    profileService.getProfile(uid).then(profile => {
      commit('SET_PROFILE', profile);
      return profile;
    });
  },
  updateProfile({ commit }, data) {
    return profileService.update(data.uid, data.profileData).then(profile => {
      commit('SET_PROFILE', profile);
    });
  },
  insertProfile({ commit }, data) {
    profileService.insert(data.uid, data.profileData).then(profile => {
      commit('SET_PROFILE', profile);
    });
  },
  getProfiles({ commit }) {
    profileService.list().onSnapshot(querySnapshot => {
      const profiles = [];

      querySnapshot.forEach(document => {
        profiles.push({
          id: document.id,
          ...document.data(),
        });
      });

      commit('SET_PROFILES', profiles);
    });
  },
};
