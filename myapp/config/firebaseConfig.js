import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// ✅ ตั้งค่า Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBnKECYdzJo4eKoyfD-3DJU9v4UeW9V18k",
  authDomain: "home-87e51.firebaseapp.com",
  projectId: "home-87e51",
  storageBucket: "home-87e51.appspot.com",
  messagingSenderId: "1045455633659",
  appId: "1:1045455633659:android:6f63dad316f1729b2fc45e"
};

// ✅ ตรวจสอบก่อน initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ ตรวจสอบว่า Auth ถูก initialize หรือยัง
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  console.warn("⚠️ Firebase Auth not initialized, initializing now...");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
