import React from 'react'
import { Link } from 'react-router-dom'
const SignIn = () => {
  return (
    <section className="bg-gray-200 min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <div className="w-80 h-96 py-2 bg-white rounded-xl flex flex-col justify-center items-center">
            <div className="text-3xl mb-4 pt-12">sign in</div>
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="text "
              placeholder="username. . ."
            />
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="text"
              placeholder="password. . ."
            />
            <button className="text-white h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer flex items-center justify-center">
              confirm
            </button>
            <div className="mb-1 text-md">or</div>
            <Link
              className="text-black mb-2 h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center"
              to="/signup"
            >
              sign up
            </Link>
          </div>
        </div>
      </section>
  )
}

export default SignIn