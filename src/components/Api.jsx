import React, { useEffect, useState } from 'react'
import Video from './Video'


const API = process.env.REACT_APP_YOUTUBE_API

const Api = ({uid}) => {
  
    const query = new URLSearchParams(document.location.search).get('q');
  
    const [allVideos,setAllVideos]= useState([])
    const [userId,setUserId]=useState();

    useEffect(()=>{
      setUserId(uid);
    },[uid])

    useEffect(()=>{
      var fetchUrl =`https://www.googleapis.com/youtube/v3/search?key=${API}&type=video&part=snippet,id&maxResults=5&q=${query}`
        fetch(fetchUrl).then((response)=>response.json()).then((resJson)=>{
            const result=resJson.items.map(doc=>({
                ...doc,
                VideoLink: "https://www.youtube.com/embed/"+doc.id.videoId
            }));
            setAllVideos(result);
            console.log(query);
        })
    },[query])
    console.log(allVideos)


  return (
    <div className='w-full flex justify-center h-screen overflow-y-scroll'>
    <div  className='pt-20 max-w-screen-lg'>
      {allVideos.map((item)=>{
        return(
          
          <Video
          key={item.id.videoId}
          uid={userId}
          src={item.id.videoId}
          title={item.snippet.title}
          channel={item.snippet.channelTitle}
          description={item.snippet.description}
          thumbnail={item.snippet.thumbnails.medium.url}
          />
         
          
        )
      })}
      </div>
      </div>
  )
}

export default Api


















// import axios from 'axios'

// export const searchResults = async (query) => {

//     const API_KEY="AIzaSyBsuJvUv7x-33DuIIKEfoTsZNSPj-RdkS0";
//     const MAX_RESULT=3;
    

//     try{
//         const res= await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${MAX_RESULT}&q=${query}`);
//          return res.json();
//     }catch(error){
//             console.log('Error while calling API' ,error.message)
//     }
// }