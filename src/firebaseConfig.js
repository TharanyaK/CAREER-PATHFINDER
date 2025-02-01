// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB16K3ygROeYMeJ6PsbKRzhk8xtMUlXmMw",
//   authDomain: "perfectjobs-lite.firebaseapp.com",
//   projectId: "perfectjobs-lite",
//   storageBucket: "perfectjobs-lite.appspot.com",
//   messagingSenderId: "690877692657",
//   appId: "1:690877692657:web:9fbee8daadf976ce790750",
//   measurementId: "G-R0BX9ZDM9K",
// };

// export const app = initializeApp(firebaseConfig);
// export const fireDB = getFirestore(app);
// Import the functions you need from the SDKs you need



import { initializeApp } from "firebase/app";
import { getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTYzCgQKFAN1c2RuqVdlL2IFhNW9xwziE",
  authDomain: "career-pathfinder.firebaseapp.com",
  projectId: "career-pathfinder",
  storageBucket: "career-pathfinder.firebasestorage.app",
  messagingSenderId: "475508180956",
  appId: "1:475508180956:web:abc580afd8be4e8939b119",
  measurementId: "G-MZ2WXSXT8E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
const usersCollection = collection(fireDB, "users"); // Correct