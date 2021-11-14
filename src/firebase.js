import firebase from "firebase/compat/app";
// import "firebase/auth";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHwaanFQlB6XQkvIDVfB5p6oiPU4DydDU",
  authDomain: "app-329214.firebaseapp.com",
  projectId: "youtube-app-329214",
  storageBucket: "youtube-app-329214.appspot.com",
  messagingSenderId: "414936722225",
  appId: "1:414936722225:web:d651606372d4d28ce21e10",
};
firebase.initializeApp(firebaseConfig);
export default firebase.auth();
