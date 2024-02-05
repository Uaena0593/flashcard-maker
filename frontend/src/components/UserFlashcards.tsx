import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserFlashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    async function getFlashcardSets() {
      try {
        const response = await axios.get('flashcard-maker-eight.vercel.app/returnflashcardsets');
        console.log(response.data.flashcardSets)
        setFlashcardSets(response.data.flashcardSets);
      } catch (error) {
        console.log(error);
      }
    }

    getFlashcardSets();
  }, []);
  
  const clickFlashcardSet = (flashcardSetId) => {
    console.log(flashcardSetId)
    history(`/createflashcards/${flashcardSetId}`);
  };

  const deleteFlashcardSet = async (flashcardSetId) => {
    try {
      const response = await axios.get(`flashcard-maker-eight.vercel.app/deleteflashcardset/${flashcardSetId}`);
      setFlashcardSets((prevFlashcardSets) =>
      prevFlashcardSets.filter((set) => set._id !== flashcardSetId)
    );
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <ul className = 'flex flex-wrap ml-20'>
          {flashcardSets.map((flashcardSet, index) => (
            <div key={index} className="flex flex-col items-center">
            <button
              onClick={() => clickFlashcardSet(flashcardSet._id)}
              className="text-white m-2 h-20 w-40 text-xl px-6 py-2 no-underline rounded-lg bg-black border border-white cursor-pointer flex items-center justify-center"
            >
              {flashcardSet.name}
            </button>
            <button
              onClick={() => deleteFlashcardSet(flashcardSet._id)}
              className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-800 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mx-1 mt-1 ease-linear transition-all duration-150"
            >
              delete
            </button>
          </div>
            
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserFlashcards;