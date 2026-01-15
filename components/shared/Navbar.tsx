
import React, { useState } from 'react';
import { User } from '../../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onNavigate?: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (view: string) => {
    onNavigate?.(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-b border-pink-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-pink-400 hover:bg-pink-50 rounded-xl transition-colors"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center shadow-sm">
                <i className="fas fa-sparkles text-white text-xs"></i>
              </div>
              <h1 className="text-lg font-bold text-gray-800">Lume Skin</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">{user.name}</p>
              <p className="text-[10px] text-pink-400 font-bold uppercase">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-72 bg-white h-full shadow-2xl menu-slide-in flex flex-col">
            <div className="bg-pink-400 p-8 text-white">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 border border-white/30 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
              </div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-xs text-white/80">{user.email}</p>
            </div>

            <div className="flex-grow p-4 space-y-2 mt-4">
              <button onClick={() => handleNav('PROFILE')} className="w-full flex items-center space-x-4 p-3 rounded-xl hover:bg-pink-50 text-gray-700">
                <i className="fas fa-user-circle w-6 text-pink-400"></i>
                <span className="font-semibold text-sm">My Profile</span>
              </button>
              <button onClick={() => alert('Settings coming soon!')} className="w-full flex items-center space-x-4 p-3 rounded-xl hover:bg-pink-50 text-gray-700">
                <i className="fas fa-cog w-6 text-pink-400"></i>
                <span className="font-semibold text-sm">Settings</span>
              </button>
              <button onClick={() => handleNav('HISTORY')} className="w-full flex items-center space-x-4 p-3 rounded-xl hover:bg-pink-50 text-gray-700">
                <i className="fas fa-history w-6 text-pink-400"></i>
                <span className="font-semibold text-sm">Records History</span>
              </button>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button onClick={onLogout} className="w-full flex items-center space-x-4 p-3 rounded-xl hover:bg-red-50 text-red-500">
                <i className="fas fa-sign-out-alt w-6"></i>
                <span className="font-bold text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
