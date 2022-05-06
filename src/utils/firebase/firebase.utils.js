import {initializeApp} from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBT0YLZEuKSkVM36eyBws7qXW-0BUwBTQg",
    authDomain: "react-store-2627.firebaseapp.com",
    projectId: "react-store-2627",
    storageBucket: "react-store-2627.appspot.com",
    messagingSenderId: "948001530802",
    appId: "1:948001530802:web:edb83f529a41740197faab"
  };


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) =>{

    const userDocRef = doc(db, 'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef)

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

if(!userSnapshot.exists()){
    const {displayName, email} =userAuth;
    const createdAt = new Date();
    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt
        })
    }catch(error){
        console.log('error creating the user', error.message)
    }
}
return userDocRef
}