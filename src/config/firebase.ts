import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyACZvLj_fe1-maagz4gWTsLDcSmciVZaA0",
  authDomain: "eindopdrachtmobile-7ceb5.firebaseapp.com",
  projectId: "eindopdrachtmobile-7ceb5",
  storageBucket: "eindopdrachtmobile-7ceb5.appspot.com",
  messagingSenderId: "800277373735",
  appId: "1:800277373735:web:1406932e665bed38cbff02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
