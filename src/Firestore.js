import firebase from "firebase";
const config = {
  apiKey: "AIzaSyAs1OJ-T67-rjr5GpV0fRG1-xscbk3ZuIk",
  authDomain: "objective-manager.firebaseapp.com",
  databaseURL: "https://objective-manager.firebaseio.com",
  projectId: "objective-manager",
  storageBucket: "objective-manager.appspot.com",
  messagingSenderId: "831708805467",
  appId: "1:831708805467:web:304cab4aa3a1010c5ec27e",
  measurementId: "G-D4JFWGGB71"
};
firebase.initializeApp(config);
export default firebase;
