import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import "firebase/performance";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1IMveU9sh1Hlr9PXtVfvFVX9bGlX2Bjc",
  authDomain: "carbuk-web-eb5f8.firebaseapp.com",
  projectId: "carbuk-web-eb5f8",
  storageBucket: "carbuk-web-eb5f8.appspot.com",
  messagingSenderId: "472917080671",
  appId: "1:472917080671:web:824f78140a8d1d6d94b9ea",
  measurementId: "G-NW15JPG0TN",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
