import React,{ useState,useEffect } from 'react'
import {GrClose} from 'react-icons/gr'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {db} from '../controller/firebase';
import Video from './Video';
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return -1;    
        } else if (a[prop] < b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
} 
 
   

const UserHistory = ({uid,signedin}) => {
    const [vid, setVid] = useState([]);
    const [signin,setsignin]=useState("hidden");
    const [signout,setsignout]=useState("");
    
    
    const onDelete = async (id) =>{
        await deleteDoc(doc(db, uid+":history", id));
        await getDocs(collection(db, uid+":history"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setVid(newData);                
                console.log(newData);
            })
    }

    
    
   
    useEffect( ()=>{
        
        if(uid){
            getDocs(collection(db, uid+":history"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setVid(newData);                
                console.log(newData);
            })
            setsignin("");
            setsignout("hidden")
        }
        else{
            setsignin("hidden");
            setsignout("")
        }
        
    },[uid])




    vid.sort(GetSortOrder("createdAt"));

  return (
    <div className='h-screen'>
        <div className={'w-full h-screen '+signout}>
        <h1 className='flex flex-row justify-center items-center w-full h-full font-medium'>Please "Sign In" to see your "History"</h1>
        </div>

        <div className={'w-full h-full flex justify-center overflow-y-scroll '+signin}>
        
            <div  className='pt-20  max-w-screen-lg '> 
            <div className='px-6 pb-4 text-xl font-bold border-b'>History</div>
                {vid.map((item)=>{
                    return(
                                
                        <div className='flex flex-row items-start'>
                            <Video
                            key={item.id}
                            uid={uid}
                            src={item.video}
                            title={item.title}
                            channel={item.channel}
                            description={item.description}
                            thumbnail={item.thumbnail}
                            />
                            <div className='mt-5 pr-2 cursor-pointer' onClick={()=>onDelete(item.id)}><GrClose /></div>

                        </div>     
                            
                    )
                })}
                    
            </div>
      
        </div>
    </div>
  )
}

export default UserHistory