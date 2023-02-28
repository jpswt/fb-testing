import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyD340Yzb2pjpwZ6gjLgrrtoe85qysmbzxI',
	authDomain: 'test-1d828.firebaseapp.com',
	projectId: 'test-1d828',
	storageBucket: 'test-1d828.appspot.com',
	messagingSenderId: '1034466493822',
	appId: '1:1034466493822:web:d5c62dde879278deb71f2f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
