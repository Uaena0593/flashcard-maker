import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFlashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);

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
  
  const clickFlashcardSet = () => {
    
  }

  return (
    <div>
      <ul>
        {flashcardSets.map((flashcardSets, index) => (
          <button key={index} onClick = { clickFlashcardSet } className="text-black h-20 w-40 text-xl px-6 py-2 no-underline rounded-lg bg-white border border-black cursor-pointer flex items-center justify-center">{ flashcardSets.name }</button>
        ))}
      </ul>
    </div>
  );
};

export default UserFlashcards;