import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email !== 'jaga@gmail.com') {
      setError('Access Denied: Invalid admin email.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Strict check on both mail and Firebase UID
      if (user.uid !== 'R1Z3EeKQXAcJRA57AQECeBYcPlJ3' || user.email !== 'jaga@gmail.com') {
        setError('Unauthorized Admin ID.');
        await auth.signOut();
        return;
      }

      navigate('/'); // Redirect to home page upon success
    } catch (err) {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="bg-[#09090b] text-white min-h-[85vh] flex items-center justify-center px-6 ">
      <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl shadow-[0_0_35px_rgba(255,99,71,0.35)] border-[#ff6347]/50">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-rose-500">Admin Login</h1>
          <p className="text-zinc-400 text-xs">Enter authorized admin credentials.</p>
        </div>

        {error && (
          <div className="bg-rose-950/60 border border-rose-900 text-rose-400 text-xs p-3.5 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Admin Email</label>
            <input
              type="email"
              placeholder="sample@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-rose-600"
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-rose-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-rose-600/30 mt-2"
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;