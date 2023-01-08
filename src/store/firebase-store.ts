// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, push, ref, set } from "firebase/database";
import { QueryClient } from "react-query";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_6y-QkpGxF0adD5d4WhD0mTJO_93hNdQ",
  authDomain: "scrum-39f93.firebaseapp.com",
  databaseURL:
    "https://scrum-39f93-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrum-39f93",
  storageBucket: "scrum-39f93.appspot.com",
  messagingSenderId: "371344012966",
  appId: "1:371344012966:web:8de6ac6b29e27e870ca667",
};
export const API_URL = firebaseConfig.databaseURL;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const storage = getStorage(app);

export const writeImageUrl = (
  img: string,
  name: string,
  id: string,
  query: QueryClient
): void => {
  void set(push(ref(database, `cardList/${id}/body`)), {
    img,
    title: name,
  }).then(async () => await query.invalidateQueries("cards"));
};
