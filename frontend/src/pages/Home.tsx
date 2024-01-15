import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const Home = () => {
  return (
    <>
      <section className="bg-black min-h-screen flex flex-col">
        <NavBar />
        <div className="pl-40 text-white flex-grow flex">
          <div className="flex flex-col mt-auto">
            <div className="pb-2 text-6xl font-custom">flashcard maker</div>
            <div className="pl-8 p-2 text-3xl">transofj;s card into card yayyay</div>
            <div className="flex flex-row pb-20">
              <button className="text-black h-12 w-60 text-xl px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center">
                sign up for free
              </button>
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
