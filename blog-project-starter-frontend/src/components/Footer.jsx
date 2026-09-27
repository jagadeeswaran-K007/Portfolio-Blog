import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#09090b] border-t border-zinc-800 py-12 px-8 text-zinc-400 text-xs shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
            JK
          </div>
          <div>
            <p className="font-bold text-white text-sm">Jagadeeswaran K</p>
            <p className="text-[11px] text-zinc-500">Full-Stack Developer</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-zinc-300 font-medium text-sm">
          <a href="/#hero" className="hover:text-rose-500 transition">Home</a>
          <a href="/#about" className="hover:text-rose-500 transition">About</a>
          <a href="/#skills" className="hover:text-rose-500 transition">Skills</a>
          <a href="/#projects" className="hover:text-rose-500 transition">Projects</a>
          <a href="/#education" className="hover:text-rose-500 transition">Education</a>
          <Link to="/blogs" className="hover:text-rose-500 transition">Blog</Link>
          <a href="/#contact" className="hover:text-rose-500 transition">Contact</a>
        </div>

        <div className="flex items-center gap-4 text-zinc-400 text-xs">
          <span className="hover:text-rose-500 transition cursor-pointer"><a href="https://github.com/jagadeeswaran-K007">GitHub</a></span>
          <span className="text-zinc-700">|</span>
          <span className="hover:text-rose-500 transition cursor-pointer"><a href="https://www.linkedin.com/in/jagadeeswaran-k-a21a43227/">LinkedIn</a></span>
          <span className="text-zinc-700">|</span>
          <a href="mailto:jaga@gmail.com" className="hover:text-rose-500 transition">Email</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 text-center text-zinc-600 text-[11px] ">
        © 2026 Jagadeeswaran K. All rights reserved. Styled with tomato red & black theme.
      </div>
    </footer>
  );
};

export default Footer;