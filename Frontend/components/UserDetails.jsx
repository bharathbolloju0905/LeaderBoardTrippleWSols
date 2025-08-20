import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const UserDetails = ({ isOpen, setisOpen ,user,count}) => {

 
  const handleClick = (e) => {
    setisOpen(!isOpen);
  }

  return (
    <div className='flex items-center space-x-4 w-full p-4 rounded-lg mt-0.5 cursor-pointer ' onClick={handleClick}>
      <h2 className='font-bold text-2xl'>{count}</h2>
      <img src="https://avatar.iran.liara.run/public/34" className='rounded-full w-6 h-6'  alt="User Avatar " />
      <div className='flex w-full justify-between'>
        <h2 className='text-lg font-semibold'>{user?.name}</h2>
        <p className='text-gray-600'>{user?.email}</p>
        <p className='text-gray-600'>Points: {Math.round(user?.points)}</p>
      </div>
    </div>
  )
}

export default UserDetails