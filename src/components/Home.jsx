import React from 'react'
import SearchBar from './SearchBar'
import Title from './Title'

const Home = () => {
  return (
    <div className='flex items-center justify-center h-screen '>
    <div className=' w-full flex flex-col justify-center mx-5 '>
        <div className='flex justify-center w-full h-fit  mb-8 text-3xl md:text-4xl'>
          <Title/>
        </div>
        
        <SearchBar/>
        
    </div>
    </div>
    
  )
}

export default Home