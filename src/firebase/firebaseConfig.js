import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// નીચેની વિગતો તમારા Firebase કન્સોલમાંથી કોપી કરેલી જ હોવી જોઈએ
const firebaseConfig = {
  apiKey: "AIzaSyB4EA-EfjwbqHYKWA7yy42z-UBxxdI2RM8",
  authDomain: "exotica-school-4b94d.firebaseapp.com",
  projectId: "exotica-school-4b94d",
  storageBucket: "exotica-school-4b94d.firebasestorage.app",
  messagingSenderId: "365346709117",
  appId: "1:365346709117:web:8411a6028533dd0ef0db14",
  measurementId: "G-7C240NWLRC"
};

// Firebase Initialize કરો
const app = initializeApp(firebaseConfig);

// Auth અને Firestore એક્સપોર્ટ કરો જેથી આખી વેબસાઈટમાં વાપરી શકાય
export const auth = getAuth(app);
export const db = getFirestore(app);