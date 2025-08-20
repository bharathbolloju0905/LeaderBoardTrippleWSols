import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from '../components/Home'
import UserProfile from '../components/UserProfile'
import './App.css'
import { Routes ,Route} from 'react-router-dom'

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/user-profile" element={<UserProfile />} /> */}

    </Routes>
    </>
  )
}

export default App
