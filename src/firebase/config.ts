import { initializeApp } from "@firebase/app";
import { ReCaptchaV3Provider, initializeAppCheck } from "@firebase/app-check";
import { connectAuthEmulator, getAuth } from "@firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "@firebase/database";
import { connectFirestoreEmulator, getFirestore } from "@firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "@firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

if (["localhost", "127.0.0.1"].includes(location.hostname)) {
  connectDatabaseEmulator(db, "localhost", 9000);
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// use custom firebase token in dev and preview
if (import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN_FROM_CI) {
  (<any>window).FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN_FROM_CI;
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_PUBLIC),
  isTokenAutoRefreshEnabled: true,
});

export { app, auth, db, firestore, functions };
