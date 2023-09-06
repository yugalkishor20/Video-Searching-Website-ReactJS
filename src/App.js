
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged} from "firebase/auth";
import { auth } from './controller/firebase';
import Authentication from './components/Authentication';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NoPage from "./components/NoPage";
import Api from "./components/Api";
import { useState,useEffect } from "react";
import UserHistory from "./components/UserHistory";
import SavedVideos from "./components/SavedVideos";


function App() {

  const [signedin,setsignedin]=useState(false);
  const [uid,setUid]=useState();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setUid(uid);
          setsignedin(true);
          
          // ...
          console.log("uid", uid)
          
        } else {
          // User is signed out
          // ...
          setUid("");
          setsignedin(false);
          console.log("user is logged out")
        }
      });
     
}, [])
  return (
    <BrowserRouter>
        <NavBar signedin={signedin} />
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="authentication" element={<Authentication signedin={signedin} />} />
        <Route path="search" element={<Api uid={uid}/>} />
        <Route path="history" element={<UserHistory uid={uid} signedin={signedin}/>} />
        <Route path="saved" element={<SavedVideos uid={uid} signedin={signedin}/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
