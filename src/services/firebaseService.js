import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCmVroOCr19oUp7obRb_fnZcMc3r1HmQ7w',
  authDomain: 'bart-geo-social.firebaseapp.com',
  databaseURL: 'https://bart-geo-social.firebaseio.com',
  projectId: 'bart-geo-social',
  storageBucket: 'bart-geo-social.appspot.com',
  messagingSenderId: '345065569142',
  appId: '1:345065569142:web:2f9e21f6471aff509f1857',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
