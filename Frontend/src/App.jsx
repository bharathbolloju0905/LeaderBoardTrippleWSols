import { useState } from 'react'

import Home from '../src/components/Home'
import UserProfile from '../src/components/UserProfile'
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
