import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Explore from './pages/Explore'
import SignIn from './pages/SignIn'
import FlashcardSets from './pages/FlashcardSets'
import CreateFlashcards from './pages/CreateFlashcards'
import MyAccount from './pages/MyAccount'
import UseFlashcards from './pages/UseFlashcards'

function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = { <Home/>}/>
        <Route path = '/signup' element = { <SignUp/>}/>
        <Route path = '/explore' element = { <Explore/> }/>
        <Route path = '/signin' element = { <SignIn/> }/>
        <Route path = '/flashcards' element = { <FlashcardSets/>}/>
        <Route path = '/myaccount' element = { <MyAccount/> }/>
        <Route path = '/createflashcards/:flashcardSetId' element = { <CreateFlashcards/> }/>
        <Route path = '/useflashcards/:flashcardSetId' element = { <UseFlashcards/> }/>
      </Routes>
    </>
  )
}

export default App
