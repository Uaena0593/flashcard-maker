import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const UserIndividualFlashcards = () => {
    const [flashcardArray, setFlashcardArray] = useState([]);
    const { flashcardSetId } = useParams();
    useEffect(() => {
        async function getFlashcards() {
          try {
            console.log(flashcardSetId)
            if (flashcardSetId) {
                const response = await axios.get(`http://localhost:3001/returnflashcards/${flashcardSetId}`);
                console.log("poggers")
                console.log(response.data.flashcards);
                setFlashcardArray(response.data.flashcards);
            }
          } catch (error) {
            console.log(error);
          }
        }
        getFlashcards();
      }, [flashcardArray]);

    return (
        <>
          <div>
            <ul className = 'flex flex-wrap ml-20'>
            {flashcardArray.map((flashcardArray, index) => (
                <div key={index} className="flex flex-col items-center">
                <button
                onClick={() => clickFlashcardSet(flashcardArray._id)}
                className="text-white m-2 h-20 w-40 text-xl px-6 py-2 no-underline rounded-lg bg-black border border-white cursor-pointer flex items-center justify-center"
                >
                     harhar har
                </button>
                <button
                onClick={() => deleteFlashcardSet(flashcardArray._id)}
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
}

export default UserIndividualFlashcards