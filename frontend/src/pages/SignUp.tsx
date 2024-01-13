import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/signup",{
        username, password
      })
      .then(res=>{
        if(res.data == "exist"){
          alert("User already exists")
        }
        else if (password != confirmPassword) {
          alert("Passwords do not match")
        }
        else if(res.data=="notexist") {
            history("/flashcards", { state:{id:username}})
        }
    })
    .catch(e=>{
      alert('wrong details')
      console.log(e);
    })

    } catch {
      console.log(e)
    }
  }
  return (
    <>
      <section className="bg-gray-200 min-h-screen">
        <div className="flex items-center justify-center h-screen">
          <form className="w-80 h-96 py-2 bg-white rounded-xl flex flex-col justify-center items-center" action = "POST">
            <div className="text-3xl mb-4 pt-12">sign up</div>
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="text "
              placeholder="username. . ."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="text"
              placeholder="password. . ."
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
              type="text"
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
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
