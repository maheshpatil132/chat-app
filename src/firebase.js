import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBr9lTVfj1pi2vilRiT2dPdACadrA6ZeXE",
  authDomain: "chat-9a410.firebaseapp.com",
  projectId: "chat-9a410",
  storageBucket: "chat-9a410.appspot.com",
  messagingSenderId: "547071854093",
  appId: "1:547071854093:web:fca63b59dc52a2ffe47744"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore()
 
const auth = firebase.auth(app)
 
export {auth}
export default db;