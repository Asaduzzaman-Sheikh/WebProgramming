import { app } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// A simple SVG component for the Google G logo.
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.398 9.612C34.782 6.209 29.732 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.437-5.437C34.782 6.209 29.732 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.24 44 30.027 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

// A simple spinner SVG to indicate a loading state.
const SpinnerIcon = () => (
    <svg 
        className="animate-spin h-5 w-5" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
    >
        <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
        ></circle>
        <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

export default function OAuth() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });
      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate('/'); // Redirect to home page on success
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      type='button' 
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="
        flex 
        items-center 
        justify-center 
        w-full 
        px-4 
        py-3 
        bg-white 
        border 
        border-gray-300 
        rounded-lg 
        shadow-sm 
        hover:shadow-md 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        focus:ring-blue-500 
        transition-all 
        duration-200 
        ease-in-out
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    >
      {loading ? <SpinnerIcon /> : <GoogleIcon />}

      <span className="ml-3 text-base font-medium text-gray-700">
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </span>
    </button>
  )
}
