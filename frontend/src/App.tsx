import { useState } from 'react'
import './App.css'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = { <Home/>}/>
        <Route path = '/signup' element = { <SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
