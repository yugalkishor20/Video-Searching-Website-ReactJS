import React, { useState } from 'react'
import {FaUserCircle} from 'react-icons/fa'
import {GrClose} from 'react-icons/gr'
import { doc, setDoc } from "firebase/firestore";
import {db} from '../controller/firebase';
import PlayVideo from './PlayVideo';

const Video = ({uid,src,title,thumbnail,channel,description}) => {

  const [play,setPlay]= useState("hidden");

  const playAndSaveVideo=async (e)=>{
    
    e.preventDefault();
      if(uid){
        try {
          const docRef = await setDoc(doc(db, uid+":history",src), {
            video: src,
            title:title,
            thumbnail:thumbnail,
            channel:channel,
            description:description,
            createdAt:Date.now()
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
      }
      setPlay("");
  }

  return (
    <>
    <div className='w-full flex flex-col sm:flex-row  p-2 cursor-pointer' onClick={playAndSaveVideo}>
      <div className='w full sm:w-1/3 flex justify-center p-3'>
        <img src={thumbnail} alt="thumbnail" className='h-full w-full rounded-lg'/>
     
      </div>
      <div className='w-full sm:w-2/3 flex flex-col items-baseline justify-center px-6'>
          <p className=' font-semibold mb-1 sm:mb-4'>{title}</p>
          <p className='py-2 flex flex-row items-center font-medium  '><FaUserCircle className='mr-3 text-gray-400'/>{channel}</p>
          <p className='hidden sm:block text-sm text-gray-500'>{description}</p>
          
      </div>
      
    </div>
    <div className={play+" fixed top-0 left-0 w-full h-screen bg-white overflow-y-scroll"}>
    <div><PlayVideo uid={uid} src={src} title={title} channel={channel} description={description} thumbnail={thumbnail}/></div>
    <div className='top-6 right-1 sm:right-5 fixed bg-white rounded-full px-2' onClick={()=>setPlay("hidden")}><GrClose/></div>
    </div>
    </>
  )
}

export default Video