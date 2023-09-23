import React, { useState } from 'react'
import { toast} from 'react-toastify';
import {AiOutlineSearch} from 'react-icons/ai'
import {BsFillMicFill} from 'react-icons/bs'
import {GrFormClose} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [text, setText]= useState("");
    const [voiceSearch, SetVoiceSearch]= useState("hidden");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (SpeechRecognition) {
        console.log("browser support speech recognition")
    }


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

    const voiceSearchStart= ()=>{
        setText("");
        
        if (SpeechRecognition) {
            SetVoiceSearch("");
            recognition.start();

            recognition.addEventListener("start", console.log("Speech Recognition Active"));
           
        }
        else {toast.error("browser does not support speech recognition")}
    }
    const voiceSearchEnd= ()=>{
        SetVoiceSearch("hidden")
        if (SpeechRecognition) {
            recognition.stop();
            recognition.addEventListener("stop",console.log("Speech Recognition Stop"));
    
        }
    }
    
    if (SpeechRecognition) {
    recognition.addEventListener("result", resultofSpeehRecognition);
    function resultofSpeehRecognition(event){
        const transcript = event.results[0][0].transcript;
        console.log(event.results[0][0]);
        setText(transcript);
         
        setTimeout(() => {
            recognition.stop();
            recognition.addEventListener("stop",console.log("Speech Recognition Stop"));
            SetVoiceSearch("hidden")
        }, 3000);
    }
    }

  return (
    <div className='flex flex-row justify-center items-center w-full h-20'>
        <div className='flex flex-row justify-center items-center w-full md:w-1/2 p-2 pt-3 px-4 border-y border-x rounded-full shadow-md cursor-pointer'>
        <form onSubmit={onFormSubmit} className='flex flex-row justify-between w-full'>
            <div className='w-full'>
                <input placeholder='Search Videos' value={text} onChange={onInputChange} className='border-none outline-none placeholder-gray-600 w-full' />
            </div>
            <div className='flex flex-row mx-2 '>
                <span className='mr-4 text-gray-500 hover:text-gray-800 hover:scale-105' onClick={voiceSearchStart}><BsFillMicFill/></span>
                <span className='text-gray-500 hover:text-gray-800 hover:scale-105' onClick={onFormSubmit}><AiOutlineSearch/></span>
            </div>
        </form>
        </div>

        <div className={'flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-black bg-opacity-30 '+voiceSearch}>
        <div className='bg-white rounded-md w-5/6 md:w-2/5 h-2/5 md:h-3/5 '>
            <div onClick={voiceSearchEnd} className='cursor-pointer'><GrFormClose className='float-right m-2 ' size={25}/></div>
            <div className='flex flex-col justify-between h-5/6 w-full'>
                <div className=' pl-8 pt-4 text-xl'>{text===""?(<span className='font-semibold'>Listening…</span>):(text)}</div>
                <div className='flex flex-row justify-center pb-5 '>
                    <BsFillMicFill className='rounded-full bg-red-600 text-white p-4 animate-pulse' size={60}/>
                </div>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default SearchBar