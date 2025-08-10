import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth ,signOut } from "../config/firebase";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [user] = useAuthState(auth);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/SignIn"); // or "/"
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center 
    justify-between px-10 py-6 bg-amber-300 border-b-2 border-amber-100 shadow-xl">

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <GraduationCap className="text-white w-9 h-9" />
        <span className="text-2xl font-bold text-white" style={{ fontFamily: 'revert-layer' }}>
          SCHOLARSGATE
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex space-x-8 text-white font-medium">
        <Link to="/" className="hover:text-amber-600">Home</Link>
        <Link to="/Scholarships" className="hover:text-amber-600">Scholarships</Link>
        {isHomePage && ( <><a href="#about" className="hover:text-amber-600 ">About</a>
        <a href="#contact" className="hover:text-amber-600">Contact</a>
        </>
        )}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex">
        {!user && <Link
          to="/SignIn"
          className="text-amber-500 mr-5 text-bold bg-amber-50 hover:text-amber-50 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-400 px-5 py-2 rounded-lg"
        >
          Log In
        </Link>}
        {!user && <Link
          to="/signup"
          className="text-amber-50 mr-5 bg-amber-500 hover:text-amber-50 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-400 px-5 py-2 rounded-lg"
        >
          Sign Up
        </Link>}
        {user && <Link to="/provider-dashboard" className="bg-green-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-black mb-4">Dashboard</Link>}
        {user && <button
          onClick={handleLogout }
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mb-4"
        >
          Logout
        </button>}
      </div>



      {/* Hamburger Icon (Mobile) */}
      <button
        className="lg:hidden text-white text-3xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-24 right-10 bg-gradient-to-b from-amber-200 to-amber-300 shadow-xl rounded-2xl py-4 px-15 flex flex-col space-y-3 lg:hidden text-white font-medium backdrop-blur-md"
        >
          <Link to="/scholarships" className="hover:text-amber-600">SCHOLARSHIPS</Link>
          <hr className="border-amber-400" />
         {isHomePage &&( <> <a href="#about" className="hover:text-amber-600">ABOUT</a>
          <hr className="border-amber-400" />
          <a href="#contact" className="hover:text-amber-600">CONTACT</a>
          <hr className="border-amber-400" />
          </>)}
          {!user && <Link to="/SignIn" className="hover:text-amber-600">LOG IN</Link>}
          <hr className="border-amber-400" />
          {!user && <Link to="/providerSignup" className="hover:text-amber-600">SIGN UP</Link>}
          {user && <Link to="/provider-dashboard">Dashboard</Link>}
        </div>
      )}
    </nav>
  );
}
