import firebase from "firebase/app";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDVaTEaAGjLi3Lefn_NL3VJHB8xn2dzQT4",
  authDomain: "cottagecore-1d994.firebaseapp.com",
  databaseURL: "https://cottagecore-1d994.firebaseio.com",
  projectId: "cottagecore-1d994",
  storageBucket: "cottagecore-1d994.appspot.com",
  messagingSenderId: "158392116903",
  appId: "1:158392116903:web:bc7d26e6616b9ae2139d82"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
