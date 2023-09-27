import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import {GrFormClose} from 'react-icons/gr'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Authentication = ({signedin}) => {

    const [signInStyle, setSignInStyle] =useState("border-t-2 border-green-600");
    const [signUpStyle, setSignUpStyle] =useState("border-s border-gray-200 bg-gray-200");
    const [showSignIn, setShowSignIn] = useState("");
    const [showSignUp, setShowSignUp] = useState("hidden");

    const signInPage= ()=>{
        setSignInStyle("border-t-2 border-green-600");
        setSignUpStyle("border-s border-gray-200 bg-gray-200");
        setShowSignIn("");
        setShowSignUp("hidden")
    }

    const signUpPage= () => {
        setSignInStyle("border-e border-gray-200 bg-gray-200");
        setSignUpStyle("border-t-2 border-green-600");
        setShowSignIn("hidden");
        setShowSignUp("")
    }

   

  return (
    <>
    {signedin?(<div className='w-full px-6 pt-24 flex justify-center font-medium'>You are already "Signed In"</div>):(
    <div className=' flex flex-col justify-center items-center absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-30'>
        <div className='w-4/5 md:w-1/2 h-fit my-20 px-4 pb-10 bg-gray-200 rounded-md '>
            <div className='w-full h-full overflow-hidden rounded-md'>
            <div className=' flex flex-row items-center pt-4 w-full'>
                <div className=' w-full flex justify-center font-semibold   '>Authentication</div>
                <Link to="/home"><GrFormClose size={25}/></Link>
            </div>
            <div className='w-full h-full p1 sm:p-4 bg-white '>
                <div className=' m1 sm:m-5 border-x border-b border-gray-200'>
                <div className='flex items-center justify-center '>
                    <button className={`w-1/2 p-3  ${signInStyle}`} onClick={signInPage}>Sign In</button>
                    <button className={`w-1/2 p-3  ${signUpStyle}`} onClick={signUpPage}>Sign Up</button>
                </div>
                <div className={showSignIn}><SignIn/></div>
                <div className={showSignUp}><SignUp/></div>
                </div>
            </div>
            </div>
        </div>
        <Outlet/>
    </div>)
}
    </>
  )
}

export default Authentication