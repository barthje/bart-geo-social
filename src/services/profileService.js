import firebaseService from './firebaseService';
import firebase from 'firebase/app';
import 'firebase/functions';

const profileCollection = firebaseService.firestore().collection('profiles');

export default {
  async insert(uid, profileData) {
    const profileReference = await profileCollection.add({
      uid,
      ...profileData,
    });

    return await profileReference.get().then(doc => {
      return doc.data();
    });
  },
  async isUnique(slug) {
    const response = await firebase
      .functions()
      .httpsCallable('isDisplayNameUnique')({
      slug,
    });

    return response;
  },
  profileExistsWithField(field, value) {
    return profileCollection
      .where(field, '==', value)
      .get()
      .then(querySnapshot => {
        return !querySnapshot.empty;
      });
  },
  delete(uid) {
    return profileCollection.doc(uid).delete();
  },
  update(uid, profileData) {
    return profileCollection
      .where('uid', '==', uid)
      .get()
      .then(profileReference => {
        return profileCollection
          .doc(profileReference.docs[0].id)
          .update(profileData)
          .then(() => {
            return profileCollection
              .doc(profileReference.docs[0].id)
              .get()
              .then(document => document.data());
          });
      });
  },
  getProfile(uid) {
    return this.getProfileByField('uid', uid);
  },
  list() {
    return profileCollection.orderBy('slug', 'desc');
  },
  getProfileByField(field, value) {
    return profileCollection
      .where(field, '==', value)
      .get()
      .then(snapshot => {
        return snapshot.docs[0].data();
      });
  },
};
