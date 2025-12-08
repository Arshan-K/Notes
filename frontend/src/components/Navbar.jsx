import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.info("Logged out successfully.");
    nav("/login");
  };

  return (
    <nav className="w-full bg-blackDeep border-b border-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gold text-xl font-bold">NotesLux</Link>
        {isLoggedIn && (
          <>
            <Link to="/notes" className="text-sm text-gray-300 hover:text-gold">Notes</Link>
            <Link to="/notes/new" className="text-sm text-gray-300 hover:text-gold">New</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-sm text-gray-300 hover:text-gold">Login</Link>
            <Link to="/register" className="text-sm text-gray-300 hover:text-gold">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-gold text-black px-3 py-1 rounded font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
