
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: fullName || (isLogin ? `Demo ${role}` : 'New User'),
      email: email || `${role.toLowerCase()}@lumeskin.com`,
      role: role
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-pink-100">
        <div className="bg-pink-100 p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <i className="fas fa-sparkles text-pink-400 text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Lume Skin</h1>
          <p className="text-gray-500 mt-1">
            {isLogin ? 'Glow with confidence' : 'Start your glow journey'}
          </p>
        </div>
        
        <div className="flex px-8 mt-6">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all ${isLogin ? 'border-pink-400 text-pink-500' : 'border-transparent text-gray-400'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all ${!isLogin ? 'border-pink-400 text-pink-500' : 'border-transparent text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Login as...</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(UserRole).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-2 rounded-xl text-[10px] font-bold transition-all duration-200 border ${
                    role === r 
                      ? 'bg-pink-400 text-white border-pink-400 shadow-md' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-pink-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-300 outline-none bg-gray-50"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-300 outline-none bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-300 outline-none bg-gray-50"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95"
          >
            {isLogin ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
