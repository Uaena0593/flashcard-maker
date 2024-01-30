import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://flashcard-maker-eight.vercel.app/signup", {
        username,
        password,
        confirmPassword,
      });
      console.log(response.data)
      if (response.data === "signupsuccess") {
        alert("User created successfully");
        localStorage.setItem('authenticated', 'authorized');
        history("/flashcards", { state: { id: username } });
      } else if (response.data === "alreadyexist") {
        alert("User already exists");
      } else if (response.data === 'notmatch') {
        alert("Passwords do not match");
      } else {
        alert("Error occurred");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    }
  };
  return (
    <>
      <section className="bg-gray-200 min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <form className="w-80 h-96 py-2 bg-white rounded-xl flex flex-col justify-center items-center" action = "POST">
            <div className="text-3xl mb-3 pt-12">sign up</div>
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="text "
              placeholder="username. . ."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="password"
              placeholder="password. . ."
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="password"
              placeholder="confirm password. . ."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick = { handleSubmit } className="text-white h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer flex items-center justify-center">
              confirm
            </button>
            <div className="mb-1 text-md">or</div>

            <Link
              className="text-black mb-2 h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center"
              to="/signin"
            >
              sign in
            </Link>
            <div
              className="text-red mb-1 h-8 w-64 text-xs px-6 py-2 no-underline bg-white cursor-pointer flex items-center justify-center"
              
            >
              *do not use a your personal usernames or passwords as this information is not encrypted
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
