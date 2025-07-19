import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container max-w-6xl mx-auto px-4 py-2 flex flex-row items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer flex-shrink-0"
        >
          <span className="text-slate-500">Safe</span>
          <span className="text-slate-700">House</span>
        </Link>

        {/* Search Box */}
        <form className="relative flex-grow min-w-0 group max-w-sm">
          <div className="relative z-10">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              className="w-full rounded-full py-2 pl-4 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:shadow-md transition"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 cursor-pointer hover:text-slate-700" />
          </div>
        </form>

        {/* Navigation Links */}
        <nav className="flex gap-4 items-center flex-shrink-0">
          <Link
            to="/"
            className="hidden sm:inline-block text-slate-700 relative cursor-pointer"
          >
            <span className="nav-link">Home</span>
          </Link>
          <Link to="/about" className="text-slate-700 relative cursor-pointer">
            <span className="nav-link">About</span>
          </Link>

          {currentUser ? (
            // If user IS signed in, link to their profile
            <Link to="/profile">
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          ) : (
            // If user is NOT signed in, link to the sign-in page
            <Link to="/sign-in" className="text-slate-700 relative cursor-pointer">
              <span className="nav-link">Sign In</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Smooth underline animation */}
      <style>{`
        .nav-link {
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(to right, #34d399, #f87171); /* green to red */
          transition: width 0.3s ease-in-out;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}