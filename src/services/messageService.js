import firebaseService from './firebaseService';

const messageCollection = firebaseService.firestore().collection('messages');

export default {
  post(message) {
    return messageCollection.add(message);
  },
  getByUserId(uid) {
    return this.getByField('uid', uid);
  },
  getByField(field, value) {
    return messageCollection
      .where(field, '==', value)
      .orderBy('created', 'asc');
  },
};
