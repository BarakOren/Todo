import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDATxyXgmU9a8edq52eN9RtlYTi6FPq_sY",
  authDomain: "to-do-857ef.firebaseapp.com",
  projectId: "to-do-857ef",
  storageBucket: "to-do-857ef.appspot.com",
  messagingSenderId: "1036405105486",
  appId: "1:1036405105486:web:e6855fbf82ed090085341f"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db}