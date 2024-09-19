import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBdh4OLSG9sb_N7scPJSauc0N5NOHbbY_E',
  authDomain: 'treasure-hunt-2024-7326f.firebaseapp.com',
  projectId: 'treasure-hunt-2024-7326f',
  storageBucket: 'treasure-hunt-2024-7326f.appspot.com',
  messagingSenderId: '458107416468',
  appId: '1:458107416468:web:e2ab5058ddc6774084a981',
  measurementId: 'G-VPM1MMKZTT',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;
isSupported()
  .then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(firebaseApp);
    } else {
      return;
    }
  })
  .catch((e) => {
    e;
    return;
  });

export default analytics;
