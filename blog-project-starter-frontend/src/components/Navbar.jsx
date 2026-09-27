import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate('/');
  };

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-[#09090b]/90 border-b border-zinc-800 py-3.5 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
      {/* Top Left Profile Icon */}
      <div
        onClick={() => handleNavClick('hero')}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
          JK
        </div>
        <div>
          <span className="font-bold text-base text-white block leading-tight">Jagadeeswaran K</span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Software Developer</span>
        </div>
      </div>

      {/* Center Nav Links */}
      <div className="hidden min-[680px]:flex items-center gap-8 text-base font-semibold text-zinc-300">
        <button onClick={() => handleNavClick('hero')} className="hover:text-rose-500 transition">Home</button>
        <button onClick={() => handleNavClick('about')} className="hover:text-rose-500 transition">About</button>
        <button onClick={() => handleNavClick('skills')} className="hover:text-rose-500 transition">Skills</button>
        <button onClick={() => handleNavClick('projects')} className="hover:text-rose-500 transition">Projects</button>
        <button onClick={() => handleNavClick('education')} className="hover:text-rose-500 transition">Education</button>
        <Link to="/blogs" className="hover:text-rose-500 transition">Blog</Link>
        <button onClick={() => handleNavClick('contact')} className="hover:text-rose-500 transition">Contact</button>
      </div>

      {/* Top Right Admin / Logout Button */}
      <div className="hidden min-[680px]:flex items-center">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-rose-600/30"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-rose-600/30"
          >
            Admin
          </Link>
        )}
      </div>

      {/* Hamburger Toggle (< 680px) */}
      <div className="flex min-[680px]:hidden items-center gap-3">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-rose-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-rose-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs"
          >
            Admin
          </Link>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-zinc-300 focus:outline-none p-1"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer (< 680px) */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#09090b] border-b border-zinc-800 py-6 px-8 flex flex-col gap-5 text-lg font-semibold text-zinc-300 min-[680px]:hidden shadow-2xl">
          <button onClick={() => handleNavClick('hero')} className="text-left py-1 hover:text-rose-500 transition">Home</button>
          <button onClick={() => handleNavClick('about')} className="text-left py-1 hover:text-rose-500 transition">About</button>
          <button onClick={() => handleNavClick('skills')} className="text-left py-1 hover:text-rose-500 transition">Skills</button>
          <button onClick={() => handleNavClick('projects')} className="text-left py-1 hover:text-rose-500 transition">Projects</button>
          <button onClick={() => handleNavClick('education')} className="text-left py-1 hover:text-rose-500 transition">Education</button>
          <Link to="/blogs" onClick={() => setMenuOpen(false)} className="text-left py-1 hover:text-rose-500 transition">Blog</Link>
          <button onClick={() => handleNavClick('contact')} className="text-left py-1 hover:text-rose-500 transition">Contact</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;