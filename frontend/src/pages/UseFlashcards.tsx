import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IndividualFlashcards from '../components/IndividualFlashcards';

const UseFlashcards = () => {
  const { flashcardSetId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [usedFlashcardIndices, setUsedFlashcardIndices] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(null);

  useEffect(() => {
    async function displayFlashcards() {
      try {
        const response = await axios.get(`http://localhost:3001/useflashcards/${flashcardSetId}`);
        const flashcardArray = response.data.flashcards;
        setFlashcards(flashcardArray);
        setCurrentFlashcardIndex(generateRandomUnusedIndex(flashcardArray.length));
      } catch (error) {
        console.log(error);
      }
    }
    displayFlashcards();
  }, [flashcardSetId]);

  const generateRandomUnusedIndex = (max) => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * max);
    } while (usedFlashcardIndices.includes(randomIndex));
    return randomIndex;
  };

  const nextFlashcard = () => {
    const nextIndex = generateRandomUnusedIndex(flashcards.length);

    setUsedFlashcardIndices([...usedFlashcardIndices, currentFlashcardIndex]);

    setCurrentFlashcardIndex(nextIndex);

    if (usedFlashcardIndices.length === flashcards.length - 1) {
      alert('all flashcards have been used');
    }
  };

  return (
    <>
      <div className="bg-black flex flex-column items-center justify-center h-screen">
        {flashcards.length > 0 && currentFlashcardIndex !== null && (
          <IndividualFlashcards card = { flashcards[currentFlashcardIndex] }></IndividualFlashcards>
        )}
        <button onClick={nextFlashcard} className = 'text-white text-3xl'>next flashcard</button>
      </div>
    </>
  );
};

export default UseFlashcards;
