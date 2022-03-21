import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCq3mz0LQxWh0Ey1vOmjitt4hwWjnGwAy8",
  authDomain: "agventure-ibid.firebaseapp.com",
  projectId: "agventure-ibid",
  storageBucket: "agventure-ibid.appspot.com",
  messagingSenderId: "579976143607",
  appId: "1:579976143607:web:4a67414abefddd8e0ea9f2",
  measurementId: "G-L05KXFZ5GB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
