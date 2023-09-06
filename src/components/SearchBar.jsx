import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillMicFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [text, setText]= useState("");

    const navigate = useNavigate();

    const onFormSubmit = event => {
        event.preventDefault();

        // redirect to /contacts
        navigate(`/search?q=${text}`);
        setText("");
    };

    
    const onInputChange = (e) => {
        setText(e.target.value);
    }
    
  return (
    <div className='flex flex-row justify-center items-center w-full h-20'>
        <div className='flex flex-row justify-center items-center w-full md:w-1/2 p-2 px-4 rounded-full shadow-md cursor-pointer'>
        <form onSubmit={onFormSubmit} className='flex flex-row justify-between w-full'>
            <div className='w-full'>
                <input placeholder='Search Videos' onChange={onInputChange} className='border-none outline-none w-full' />
            </div>
            <div className='flex flex-row mx-2 '>
                <span className='mr-4 text-gray-500 hover:text-gray-800 hover:scale-105'><BsFillMicFill/></span>
                <span className='text-gray-500 hover:text-gray-800 hover:scale-105'><AiOutlineSearch/></span>
            </div>
        </form>
        </div>
    </div>
    
  )
}

export default SearchBar