import React from 'react'
import { Link } from 'react-router-dom'

const MyAccount = () => {
  const handleSubmit = () => {
    localStorage.setItem('authenticated', '');
  }
  return (
    <>
        <Link
              to={'/'} onClick = { handleSubmit }
              className="text-white text-lg px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer"
            >
             sign out
        </Link>
    </>
  )
}

export default MyAccount