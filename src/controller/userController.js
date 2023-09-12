import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import {  signOut } from "firebase/auth";
import { auth } from './firebase';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



export const onSignUp =async  (email, password)=> {
   
   
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed Up
          const user = userCredential.user;
          console.log(user);
          toast.success("Signed Up Successfully");
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error(errorMessage);
          // ..
      });

 
  }

export const onSignIn =(email, password)=>{
   
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast.success("Signed In Successfully");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(errorMessage);
    });
   
}

export const onSignOut = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        console.log("Signed out successfully")
        toast.success("Logged Out Successfully")
    }).catch((error) => {
    // An error happened.
        toast.error(error.message)
    });
}

