import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserFlashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    async function getFlashcardSets() {
      try {
        const response = await axios.get('http://localhost:3001/returnflashcardsets');
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

  return (
    <>
      <div>
        <ul className = 'flex ml-20'>
          {flashcardSets.map((flashcardSet, index) => (
            <button
              key={index}
              onClick={() => clickFlashcardSet(flashcardSet._id)}

              className="text-white m-2 h-20 w-40 text-xl px-6 py-2 no-underline rounded-lg bg-black border border-white cursor-pointer flex items-center justify-center"
            >
              {flashcardSet.name}
            </button>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserFlashcards;