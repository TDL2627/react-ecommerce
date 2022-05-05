import {initializeApp} from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBT0YLZEuKSkVM36eyBws7qXW-0BUwBTQg",
    authDomain: "react-store-2627.firebaseapp.com",
    projectId: "react-store-2627",
    storageBucket: "react-store-2627.appspot.com",
    messagingSenderId: "948001530802",
    appId: "1:948001530802:web:edb83f529a41740197faab"
  };


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)