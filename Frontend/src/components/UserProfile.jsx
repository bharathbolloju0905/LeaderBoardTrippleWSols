import React ,{useState}from 'react'
import {useLocation} from "react-router-dom"
import { RxCross1 } from "react-icons/rx" ;

const UserProfile = ({ isOpen, setisOpen,user,fetchData,rank }) => {
  const [loading, setloading] = useState(false)
  async function handleClick(e) {
    e.stopPropagation();
    try {
      setloading(true);
      const claim = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user._id}/claim`, {
        method: 'GET',
      });
      const data = await claim.json();
      const history = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user._id}/history`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        }
      });
      const historyData = await history.json();
      console.log('Claim response:', data);
      console.log('History response:', historyData);
      fetchData();
      setisOpen(false);
    } catch (error) {
      console.error('Error claiming points:', error);

    }
    finally{
      setloading(false);
    }

  }
  return (
    <div className='p-4 bg-white shadow-md rounded-lg mt-4 w-1/3 absolute top-[30%]'>
      <div>

        <img src="https://avatar.iran.liara.run/public/34" className='rounded-full w-24 h-24' alt="User Avatar" />

      </div>
      <span className='absolute top-1 right-1 font-extrabold'><RxCross1 className='cursor-pointer' onClick={() => setisOpen(!isOpen)} /></span>
      <h2 className='font-bold text-2xl'>{rank}</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
     <div className='flex justify-between items-center'>
         <p>Points: {Math.round(user?.points)}</p>
        <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded  cursor-pointer' onClick={handleClick} disabled={loading}>{loading ? 'Claiming...' : 'Claim'}</button>
     </div>
    </div>
  )
}

export default UserProfile