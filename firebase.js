import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import analytics from '@react-native-firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAl5fPjhvCJSD4uBWn79K9vIjMnqE9yQkc",
  authDomain: "speechspark-3d6a1.firebaseapp.com",
  projectId: "speechspark-3d6a1",
  storageBucket: "speechspark-3d6a1.appspot.com",
  messagingSenderId: "582043799426",
  appId: "1:582043799426:web:b999efd26d4aba4559499b",
  measurementId: "G-LGQY17CGD7"
};

useEffect(() => {
  // Set analytics screen name on component mount
  analytics().setCurrentScreen('HomeScreen');
}, []);

const app = initializeApp(firebaseConfig);
const db = app.firestore();

export default db;
