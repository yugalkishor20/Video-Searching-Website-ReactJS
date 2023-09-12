import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import { onSignIn } from '../controller/userController';

const SignIn = () => {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const onFormSubmit = async(e)=>{

        e.preventDefault();

        await onSignIn(email,password);
        navigate("/home");
        
        

    }


  return (
    <div className='p-2 sm:p-6'>
        <form className='flex flex-col justify-center items-center  ' onSubmit={onFormSubmit}>
          <div className=' flex flex-row items-center w-full p-3 shadow-inner px-4 m-2 border-x border-y rounded-md'>
            <FaUserCircle size={20} className='text-gray-400'/>
            <input type='email' placeholder='Enter Email ' onChange={(e) => setEmail(e.target.value)}   className='placeholder:text-black outline-none ml-3'/>
          </div>
          <div className=' flex flex-row items-center w-full p-3 shadow-inner m-2 px-4 border-x border-y rounded-md'>
            <RiLockPasswordFill size={20} className='text-gray-400'/>
            <input type='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} className='placeholder:text-black outline-none ml-3'/>
          </div>
          
          <div className='w-full m-4 text-white font-semibold rounded-md cursor-pointer p-2 text-center bg-gradient-to-b from-green-500 to-green-600'>
            <button type="submit" className='w-full' onClick={onFormSubmit}>Sign In</button>
          </div>
        </form>

    </div>
  )
}

export default SignIn