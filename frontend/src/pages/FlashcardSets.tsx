import React from 'react'
import NavBar from '../components/NavBar'
import { useNavigate, useLocation } from "react-router-dom"
import UserFlashcards from '../components/UserFlashcards'
import { Link } from "react-router-dom"
import axios from 'axios'

const FlashcardSets = () => {
  const location = useLocation()
  const createFlashcardSet = async (e) => {
    try {
      const response = await axios.post("http://localhost:3001/createflashcardset");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <section className = "min-h-screen bg-black">
        <NavBar></NavBar>
        <div className = 'text-2xl ml-40 text-white'>welcome {location.state.id }, edit or create flashcards here</div>
        <div className = "flex flex-row">
          <UserFlashcards></UserFlashcards>
          <Link to = "/createflashcards" onClick = { createFlashcardSet } className = "text-black mb-2 h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center">create flashcards</Link>
        </div>
      </section>
    </>
  )
}

export default FlashcardSets