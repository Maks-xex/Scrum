// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, push, ref, set } from "firebase/database";
import { QueryClient } from "react-query";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
export const DATABASE_URL = firebaseConfig.databaseURL;

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
