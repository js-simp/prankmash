import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAMivUio3iK3IPJhHLLGApCxlSprmJmUp4",
    authDomain: "prankmash-2247c.firebaseapp.com",
    projectId: "prankmash-2247c",
    storageBucket: "prankmash-2247c.appspot.com",
    messagingSenderId: "285184582933",
    appId: "1:285184582933:web:3a4a7026c9a993deebb51c",
    measurementId: "G-B2F1F9YN60"
  });


const db = firebaseApp.firestore();

export default db;