const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.isDisplayNameUnique = functions.https.onCall((data, context) => {
  return admin
    .firestore()
    .collection('profiles')
    .where('slug', '==', data.slug)
    .get()
    .then(querySnapshot => {
      return { unique: querySnapshot.empty };
    })
    .catch(error => {
      throw new functions.https.HttpsError('failed to connect');
    });
});
