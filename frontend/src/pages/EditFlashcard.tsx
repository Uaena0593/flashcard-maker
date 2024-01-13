import React from 'react'
import NavBar from '../components/NavBar'
import { useNavigate, useLocation } from "react-router-dom"

const EditFlashcard = () => {
  const location = useLocation()
  return (
    <>
      <NavBar></NavBar>
      <h1>Welcome {location.state.id }, what would you like to  ??</h1>
    </>
  )
}

export default EditFlashcard