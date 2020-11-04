import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCakB6QQzDrBAB93f2A8DvvpDkwollzyNU',
  authDomain: 'linkedin-214e2.firebaseapp.com',
  databaseURL: 'https://linkedin-214e2.firebaseio.com',
  projectId: 'linkedin-214e2',
  storageBucket: 'linkedin-214e2.appspot.com',
  messagingSenderId: '864739740030',
  appId: '1:864739740030:web:ff84793ba57de822ff4b2f',
  measurementId: 'G-218HBK45R7',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
