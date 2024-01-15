import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/signin', {
        username,
        password,
      });

      if (response.data === 'match') {
        localStorage.setItem('authenticated', 'authorized');
        setAuthenticated(true);
        history('/flashcards', { state: { id: username } });
      } else if (username === '' || password === '') {
        alert('Please enter a username and password');
      } else if (response.data === 'wrongpassword') {
        alert('Incorrect password');
      } else if (response.data === 'notexist') {
        alert('User does not exist');
      } else {
        alert('Error occurred');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred');
    }
  }

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get('http://localhost:3001/checkauth');
        const isUserAuthenticated = localStorage.getItem('authenticated') === 'authorized';
        setAuthenticated(response.data === 'authenticated' || isUserAuthenticated);
      } catch (error) {
        console.log(error);
      }
    }

    checkAuthentication();
  }, [history]);

  return (
    <section className="bg-gray-200 min-h-screen">
      <div className="flex items-center justify-center h-screen">
        <form className="w-80 h-96 py-2 bg-white rounded-xl flex flex-col justify-center items-center" action="POST">
          <div className="text-3xl mb-4 pt-12">Sign In</div>
          <input
            className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
            type="text"
            placeholder="Username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="bg-gray-200 mb-3 pl-4 h-8 w-75 border-transparent rounded-xl focus:outline-none"
            type="password"
            placeholder="Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={handleSubmit}
            className="text-white h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer flex items-center justify-center"
          >
            Confirm
          </button>
          <div className="mb-1 text-md">or</div>
          <Link
            className="text-black mb-2 h-8 w-40 text-md px-6 py-2 no-underline rounded-full bg-white border border-black cursor-pointer flex items-center justify-center"
            to="/signup"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
