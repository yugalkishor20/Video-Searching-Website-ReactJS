import React from 'react'
import {FaUserCircle} from 'react-icons/fa'
import { doc, setDoc  } from "firebase/firestore";
import {db} from '../controller/firebase';
import Title from './Title'




const PlayVideo = ({uid,src,title,channel,description,thumbnail}) => {

  const saveVideo=async (e)=>{
    
    e.preventDefault();
      if(uid){
        console.log(uid);
        try {
          const docRef = await setDoc(doc(db, uid+":saved",src), {
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

  }

  return (

    
    <>
    <div className='flex px-3 sm:justify-center text-base sm:text-2xl font-bold py-2 border-b border-gray-100 bg-white shadow-sm'><Title/></div>
    <div className='w-full flex flex-row justify-center items-center pt-6 px-4'>
      <div className='w-full md:w-1/2 '>
        <div className=' w-full aspect-video cursor-pointer'>
          <iframe className=' w-full h-full  rounded-md' src={"https://www.youtube.com/embed/"+src+"?rel=0"} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
        <div className='pt-3 pb-1 px-1 font-bold text-xl sm:border-b'>{title}</div>
        <div className='my-1 px-1 flex flex-col sm:flex-row sm:justify-between sm:items-center sm:border-b'>
        <p className='my-1 flex flex-row items-center font-semibold text-sm  '><FaUserCircle className='mr-3 text-black text-2xl'/>{channel}</p>
        
        
        <p className='block sm:hidden text-sm font-medium text-gray-500 py-4'>{description}</p>

        <button className='bg-black text-white px-3 font-medium py-1 my-1 rounded-full hover:bg-gray-800' onClick={saveVideo}>Save Video</button>
        </div>
        <p className=' hidden sm:block text-sm font-medium text-gray-500 py-4'>{description}</p>
        
      </div>
    </div>
    </>
  )
}

export default PlayVideo