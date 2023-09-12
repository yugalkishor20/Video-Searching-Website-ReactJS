import React, { useState,useEffect} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import { Outlet, Link, useLocation } from "react-router-dom";
import Title from './Title'
import { onSignOut } from '../controller/userController';


const NavBar = ({uid,signedin}) => {
    const [nav, setNav]=useState(false);
    const [signin,setsignin]=useState("");
    const [signout,setsignout]=useState("hidden");
    const location =useLocation();
    const links=[
        {
            id:1,
            link:'home'
        },
        {
            id:2,
            link:'history'
        },
        {
            id:3,
            link:'saved'
        },
        
    ]
    
    useEffect(()=>{
        if(signedin){
        setsignin("hidden");
        setsignout("")
        }
        else{
            setsignin("");
            setsignout("hidden")
        }
    },[signedin])


  return (
    <div className='flex justify-between border-b border-gray-100 bg-white shadow-sm items-center w-full h-16 px-2 fixed '>
        <div>
            {
                location.pathname==='/home'||location.pathname==='/'?(
                    <h1 className="text-3xl font-bold ml-2">
                        Project
                    </h1>
                ):(
                    <div className='text-xl sm:text-2xl'>
                        <Title/>
                    </div>
                )
            }
        </div>
        <ul className='hidden md:flex items-center'>
            {links.map(({id,link}) =>(
                <Link to={link} key={id} className='mx-2 px-2 py-5 hover:text-black duration-75 cursor-pointer capitalize font-medium text-gray-500 hover:border-y-2 border-black'>
                {link}
                </Link>
            ))}

            <Link to="/authentication" className={'mx-4 px-4 py-2 hover:text-white cursor-pointer font-medium text-white bg-black rounded-md  '+signin}>
                <div className=' hover:scale-105 duration-200 '>Sign In</div>
                
            </Link>
            <div className={' mx-4 px-4 py-2 hover:text-white cursor-pointer font-medium text-white bg-gradient-to-b from-red-400 to-red-500 rounded-md  '+signout} onClick={()=>onSignOut()}>
                <div className=' hover:scale-105 duration-200 '>Logout</div>
                
            </div>
            
        </ul>
        
        <div onClick={()=>setNav(!nav)} className='cursor-pointer pr-4 z-10 text-gray-500 duration-200 md:hidden '>
            {nav? <FaTimes size={30}/>:<FaBars size={30}/>}

        </div>
        
        
        {nav&&(
            <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-white text-gray-500'>
            {links.map(({id,link,style}) => (
                <Link to={link} key={id} className='px-4 py-6 cursor-pointer capitalize text-2xl '>
                <span onClick={()=>setNav(!nav)}>{link}</span>
                </Link>
            
            ))}
            
            <li className={`p-3 my-6  cursor-pointer capitalize text-2xl text-white bg-black rounded-md ${signin}`}>
                <span onClick={()=>setNav(!nav)}>
                    <Link to="/authentication">Sign In</Link>
                </span>
            </li>
            <li className={`p-3 my-6  cursor-pointer capitalize text-2xl text-white bg-red-500 rounded-md ${signout}`}>
                <span onClick={()=>{
                    setNav(!nav);
                    onSignOut();
                    }}>
                    Logout
                </span>
            </li>
            </ul>
            )}
        
        <Outlet/>
    </div>
  )
}

export default NavBar