import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateFlashcards = () => {
  const { flashcardSetId } = useParams();
  
  const [flashcardSetTitle, setFlashcardSetTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const history = useNavigate();

  useEffect(() => {
    async function fetchFlashcardSetTitle() {
      try {
        if (flashcardSetId) {
          console.log('Flashcard Set ID:', flashcardSetId);
          const response = await axios.get(`http://localhost:3001/createflashcards/${flashcardSetId}`);
          
          console.log('Response:', response.data);
          setFlashcardSetTitle(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching flashcard set title:', error);
      }
    }
  
    fetchFlashcardSetTitle();
  }, [flashcardSetId]);

  const handleTitleChange = (e) => {
    setFlashcardSetTitle(e.target.value);
  };

  const saveTitleChanges = async () => {
    try {
        console.log(flashcardSetId);
        await axios.put(`http://localhost:3001/updateflashcardset/${flashcardSetId}`, {
            name: flashcardSetTitle,
        });
    } catch (error) {
        console.log(error);
    }
};


const createFlashcard = async (e) => {
  e.preventDefault();

  try {
      await axios.post(`http://localhost:3001/createflashcard/${flashcardSetId}`, {
          question,
          answer,
      });
  } catch (error) {
      console.log(error);
  }
};


  return (
    <>
      <div className="w-80 h-96 py-2 bg-white rounded-xl flex flex-col justify-center items-center">
        <input
          type="text"
          value={flashcardSetTitle}
          onChange={handleTitleChange}
          className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
        />
        <button onClick={saveTitleChanges} className="mb-3">save title changes</button>
        <form className="flex flex-col justify-center items-center" onSubmit={createFlashcard}>
          <input
            className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
            type="text"
            placeholder="front..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
            type="text"
            placeholder="back"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="submit">Create Flashcard</button>
        </form>
      </div>
    </>
  );
};

export default CreateFlashcards;
