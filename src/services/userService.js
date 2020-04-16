import firebaseService from './firebaseService';

export default {
  register(email, password) {
    return firebaseService
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        return response.user;
      });
  },
  login(email, password) {
    return firebaseService
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        return response.user;
      });
  },
};
