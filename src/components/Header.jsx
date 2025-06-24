import { FaSearch } from 'react-icons/fa';
import React from 'react';
// Header component for the application

export default function Header() {
  return (
    <div>
      <header className=' bg-slate-200 shadow-md'>
        <div className='container max-w-6xl mx-auto px-4 py-2 flex items-center justify-between'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Safe</span>
            <span className='text-slate-700'>House</span>
        </h1>
        <form className='flex items-center w-full sm:w-auto'>
            <input type="text" name="search" id="search" placeholder="Search..." className='border border-slate-300 rounded-full py-2 px-4' />
            <FaSearch className='text-slate-500 ml-2 cursor-pointer hover:text-slate-700' />
        </form>
        </div>
      </header>
    </div>
  )
}
