import { useState } from 'react'

interface Props {
  card : string[];
}
const IndividualFlashcards = ({ card } : Props) => {
  const [flashcardText, setFlashcardText] = useState('')
  const switchSide = () => {
    if (flashcardText == card.question) {
      setFlashcardText(card.answer)
    } else {
      setFlashcardText(card.question)
    }
  }
  return (
    <>
      <button onClick={switchSide} className="text-black h-60 w-96 text-4xl px-6 py-2 no-underline rounded-lg bg-white border border-black cursor-pointer flex items-center justify-center">
        {flashcardText}
      </button>
    </>
  )
}

export default IndividualFlashcards