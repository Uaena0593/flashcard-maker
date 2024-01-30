
import { Link } from 'react-router-dom'
import axios from 'axios';

const MyAccount = () => {
  const handleSignOut = async (e) => {
    e.preventDefault
    try {
      await axios.post("https://flashcard-maker-eight.vercel.app/signout");
      localStorage.setItem('authenticated', '');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <>
      <Link
        to={'/'} onClick={handleSignOut}
        className="text-white text-lg px-6 py-2 no-underline rounded-full bg-black border border-white cursor-pointer"
      >
        sign out
      </Link>
    </>
  );
};

export default MyAccount