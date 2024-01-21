// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl5fPjhvCJSD4uBWn79K9vIjMnqE9yQkc",
  authDomain: "speechspark-3d6a1.firebaseapp.com",
  projectId: "speechspark-3d6a1",
  storageBucket: "speechspark-3d6a1.appspot.com",
  messagingSenderId: "582043799426",
  appId: "1:582043799426:web:b999efd26d4aba4559499b",
  measurementId: "G-LGQY17CGD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);