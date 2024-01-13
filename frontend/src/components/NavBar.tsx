import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <nav className="p-4 bg-black">
        <div className="container mx-auto flex justify-between items-center padding">
          <div className="flex-shrink-0">
            <span className="text-white text-xl">chen</span>
          </div>
          <div className="flex items-center space-x-12">
            <input type ='text' placeholder = "find flashcards. . . " className = "bg-gray-200 pl-5 h-10 w-96 border-transparent rounded-full focus:outline-none"/>
            <Link to="/" className="text-white no-underline text-xl">
              home
            </Link>
            <Link to="/about" className="text-white no-underline text-xl">
              about
            </Link>
            <Link
              to="/signup"
              className="text-white text-lg px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer"
            >
              sign up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
