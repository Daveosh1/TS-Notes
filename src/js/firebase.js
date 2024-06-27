import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN31H_c6fEN9XgFYGTeDsuFld83-rJzIA",
  authDomain: "ts-notes-49577.firebaseapp.com",
  projectId: "ts-notes-49577",
  storageBucket: "ts-notes-49577.appspot.com",
  messagingSenderId: "710137138964",
  appId: "1:710137138964:web:c6f704428e6ddb63a73c01",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
