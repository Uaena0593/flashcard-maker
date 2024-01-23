import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const CreateFlashcards = () => {
  const { flashcardSetId } = useParams();
  const [input, setInput] = useState('')
  const [flashcardSetTitle, setFlashcardSetTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const history = useNavigate();

  useEffect(() => {
    async function fetchFlashcardSetTitle() {
      try {
        if (flashcardSetId) {
          console.log('flashcard Set ID:', flashcardSetId);
          const response = await axios.get(`http://localhost:3001/createflashcards/${flashcardSetId}`);
          console.log('response:', response.data);
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
        alert("title has been saved")
    } catch (error) {
        console.log(error);
    }
};


const createFlashcard = async (e) => {
  e.preventDefault();

  if (!question || !answer) {
    alert("Please provide both a question and an answer.");
    return;
  }

  try {
    const response = await axios.post(`http://localhost:3001/createflashcard/${flashcardSetId}`, {
      question,
      answer,
    });
    alert("flashcard created successfully")
  } catch (error) {
    console.log(error);
  }
};

const useFlashcards = () => {
  history(`/useflashcards/${flashcardSetId}`);
}

const converterSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("converterSubmit has been tried");
    const response = await axios.post('http://localhost:3001/cardConverter', {
      input,
    });
    console.log(response.data);
    const array = response.data;
    console.log(array);

    for (const item of array) {
      const question = item.front;
      const answer = item.back;
      console.log(question);
      const response = await axios.post(`http://localhost:3001/createflashcard/${flashcardSetId}`, {
        question,
        answer,
      });
      if (response.data)
      console.log(answer);
    }
  } catch(error) {
    console.error('Error:', error);
  }
};

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col justify-center items-center">
        <input
          type="text"
          value={flashcardSetTitle}
          onChange={handleTitleChange}
          className="bg-gray-200 mb-3 pl-4 h-12 w-80 text-2xl border-transparent rounded-xl focus:outline-none"
        />
        <button onClick={saveTitleChanges} className="mb-3 text-black text-xl">save title changes</button>
        <form className="flex flex-col justify-center items-center" onSubmit={createFlashcard}>
          <input
            className="bg-gray-200 mb-3 pl-4 h-12 w-60 border-transparent text-xl rounded-xl focus:outline-none"
            type="text"
            placeholder="front..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            className="bg-gray-200 mb-3 pl-4 h-12 w-60 border-transparent text-xl rounded-xl focus:outline-none"
            type="text"
            placeholder="back"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="submit" className = "text-black mb-2 h-12 w-60 text-xl px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center">create flashcard</button>
          <button onClick = { useFlashcards } className = "text-white mb-12 h-12 w-60 text-xl px-6 py-2 no-underline rounded-full bg-black border border-black cursor-pointer flex items-center justify-center">use flashcards </button>
        </form>
        <form className="flex flex-col justify-center items-center" onSubmit={ converterSubmit }>
          <input className="bg-gray-200 mb-3 pl-4 h-40 w-80 border-transparent text-xl rounded-xl focus:outline-none"
              type="text"
              placeholder="converted stuff..."
              value= {input }
              onChange={(e) => setInput(e.target.value)}
              />
          <button type = 'submit' className = "text-white mb-12 h-12 w-60 text-xl px-6 py-2 no-underline rounded-full bg-black border border-black cursor-pointer flex items-center justify-center"></button>
        </form>
      </div>
    </>
  );
};

export default CreateFlashcards;
