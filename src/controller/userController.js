import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import {  signOut } from "firebase/auth";
import { auth } from './firebase';



export const onSignUp =async  (email, password)=> {
   
   
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });

 
  }

export const onSignIn =(email, password)=>{
   
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}

export const onSignOut = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

