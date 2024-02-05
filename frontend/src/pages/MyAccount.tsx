import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import UserFlashcards from '../components/UserFlashcards';

const MyAccount = () => {
  const handleSignOut = async (e) => {
    e.preventDefault
    try {
      await axios.post("flashcard-maker-eight.vercel.app/signout");
      localStorage.setItem('authenticated', '');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <>
      <section className="bg-black min-h-screen flex flex-row">
        <div className="mt-20 flex flex-row">
          <div className="flex flex-row mr-20 ml-20">
            <div className="text-white text-2xl">
              your flashcards:
            </div>
            <UserFlashcards/>
          </div>
          <Link
            to={'/'} onClick={handleSignOut}
            className="text-white text-lg h-12 px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer"
          >
            sign out
          </Link>
        </div>
      </section>
    </>
  );
};

export default MyAccount