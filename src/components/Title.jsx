import React from 'react'
import logo from '../assets/logo.png'

const Title = () => {
  return (
    <header className='flex flex-row items-center font-bold '>
        <div className=' w-14 h-14 mx-3'>
            <img src={logo} className="w-full h-full" alt="logo" />
        </div>
        <div className='mr-3'>Video Searching Website</div>
    </header>
  )
}

export default Title