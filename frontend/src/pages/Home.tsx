import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from 'axios'
const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get('https://flashcard-maker-eight.vercel.app/checkauth');
        const isUserAuthenticated = localStorage.getItem('authenticated') === 'authorized';
        setAuthenticated(response.data === 'authenticated' || isUserAuthenticated);
        console.log(authenticated)
      } catch (error) {
        console.log(error);
      }
    }

    checkAuthentication();
  }, [authenticated]);
  return (
    <>
      <section className="bg-black min-h-screen flex flex-col">
        <NavBar />
        <div className="pl-40 text-white flex-grow flex">
          <div className="flex flex-col mt-auto">
            <div className="pb-2 text-6xl font-custom">flashcard maker</div>
            <div className="pl-8 p-2 text-3xl">transform documents into flashcards</div>
            <div className="flex flex-row pb-20">
              <Link
              to={authenticated ? "/flashcards" : "/signup"}
              className="text-black h-12 w-60 text-xl px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center"
              >
                {authenticated ? "create flashcards" : "sign up for free"}
              </Link>
              <button className="text-white h-12 w-60 text-xl px-6 py-2 ml-4 no-underline rounded-full bg-black border border-white cursor-pointer flex items-center justify-center">
                find flashcards
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
