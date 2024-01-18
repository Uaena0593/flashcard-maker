import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    // Generate a random index until an unused one is found
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * max);
    } while (usedFlashcardIndices.includes(randomIndex));
    return randomIndex;
  };

  const nextFlashcard = () => {
    // Find the next unused flashcard
    const nextIndex = generateRandomUnusedIndex(flashcards.length);

    // Update the list of used flashcard indices
    setUsedFlashcardIndices([...usedFlashcardIndices, currentFlashcardIndex]);

    // Update the current flashcard index
    setCurrentFlashcardIndex(nextIndex);

    if (usedFlashcardIndices.length === flashcards.length - 1) {
      alert('All flashcards have been used');
    }
  };

  return (
    <>
      {flashcards.length > 0 && currentFlashcardIndex !== null && (
        <div>
          <p>Front: {flashcards[currentFlashcardIndex].question}</p>
          <p>Back: {flashcards[currentFlashcardIndex].answer}</p>
        </div>
      )}
      <button onClick={nextFlashcard}>Next Flashcard</button>
    </>
  );
};

export default UseFlashcards;
