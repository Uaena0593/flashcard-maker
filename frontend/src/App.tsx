import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'

function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = { <Home/>}/>
        <Route path = '/signup' element = { <SignUp/>}/>
        <Route path = '/about' element = { <About/> }/>
        <Route path = '/signin' element = { <SignIn/> }/>
      </Routes>
    </>
  )
}

export default App
