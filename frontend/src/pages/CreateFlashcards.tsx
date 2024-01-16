import React, { useState } from 'react';
import axios from 'axios';

const CreateFlashcards = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function createFlashcard(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/signin', {
        question,
        answer,
      });
    } catch (error) {

      console.log(error)
    }
  }

  return (
    <>
      <form className="w-80 h-96 py-2 bg-white rounded-xl flex flex-col justify-center items-center" action="POST">
        <input
          className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
          type="text"
          placeholder="front..."
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <input
          className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
          type="text"
          placeholder="back"
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button onClick={createFlashcard}>Create Flashcard</button>
      </form>
    </>
  );
};

export default CreateFlashcards;
