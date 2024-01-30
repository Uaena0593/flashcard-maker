import React from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import UserFlashcards from '../components/UserFlashcards';
import axios from 'axios';

const FlashcardSets = () => {
  const history = useNavigate();
  const location = useLocation();

  const createFlashcardSet = async () => {
    try {
      const response = await axios.post('https://flashcard-maker-eight.vercel.app/createflashcardset', {
      });

      console.log(response.data);
      const insertedId = response.data;
      history(`/createflashcards/${insertedId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-black relative">
        <NavBar />
        <div className="text-2xl ml-40 text-white">
          welcome {location.state.id}, edit or create flashcards here
        </div>
        <div className="flex flex-row ml-16 mt-2">
          <UserFlashcards />
        </div>
        <button
          onClick={createFlashcardSet}
          className="text-center text-black mb-10 mr-20 h-16 w-56 text-xl px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center absolute bottom-4 right-10 "
        >
          create flashcards
        </button>
      </section>
    </>
  );
};

export default FlashcardSets;
