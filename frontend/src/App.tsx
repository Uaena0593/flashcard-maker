import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import EditFlashcard from './pages/EditFlashcard'

function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = { <Home/>}/>
        <Route path = '/signup' element = { <SignUp/>}/>
        <Route path = '/about' element = { <About/> }/>
        <Route path = '/signin' element = { <SignIn/> }/>
        <Route path = '/flashcards' element = { <EditFlashcard/>}/>
      </Routes>
    </>
  )
}

export default App
