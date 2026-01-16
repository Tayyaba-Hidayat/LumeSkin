import React, { useState } from 'react';
import { User, Product } from '../../types';
import SkinAnalysis from './SkinAnalysis';
import ProductShop from './ProductShop';
import ConsultationBooking from './ConsultationBooking';
import Chatbot from './Chatbot';
import { PatientViewType } from '../../App';

interface PatientDashboardProps {
  user: User;
  currentView: PatientViewType;
  setView: (view: PatientViewType) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, currentView, setView }) => {
  const [cart, setCart] = useState<Product[]>([]);

  if (currentView === 'ANALYSIS') return <SkinAnalysis onBack={() => setView('HOME')} />;
  if (currentView === 'SHOP') return <ProductShop onBack={() => setView('HOME')} onGoToCheckout={() => setView('CHECKOUT')} onAddToCart={(p) => setCart([...cart, p])} cartCount={cart.length} />;
  if (currentView === 'BOOK') return <ConsultationBooking onBack={() => setView('HOME')} />;
  if (currentView === 'CHAT') return <Chatbot onBack={() => setView('HOME')} />;
  
  if (currentView === 'HISTORY') {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('HOME')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm transition-transform active:scale-95"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">My Glow Journey</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm">
            <div className="flex justify-between mb-2">
              <p className="font-bold text-gray-800">Consultation Result</p>
              <span className="text-[10px] font-bold text-gray-400">12 Feb 2024</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Skin Type identified: Oily-Combination. Sensitivity noted around cheek area.</p>
            <div className="flex space-x-2">
               <button onClick={() => alert('Opening PDF prescription...')} className="text-[10px] font-bold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-lg"><i className="fas fa-file-download mr-1"></i> Prescription</button>
               <button onClick={() => alert('Product recommendations opened.')} className="text-[10px] font-bold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-lg"><i className="fas fa-tags mr-1"></i> Products</button>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm opacity-70">
            <div className="flex justify-between mb-2">
              <p className="font-bold text-gray-800">Routine Checkup</p>
              <span className="text-[10px] font-bold text-gray-400">01 Jan 2024</span>
            </div>
            <p className="text-xs text-gray-600">Initial scan performed. Baseline skin health score: 82/100.</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'CHECKOUT') {
    const total = cart.reduce((acc, p) => acc + p.price, 0);
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('SHOP')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">Review Cart</h2>
        </div>
        <div className="bg-white rounded-3xl border border-pink-100 p-6 space-y-4 shadow-sm">
          {cart.length === 0 ? <div className="text-center py-10">
            <i className="fas fa-shopping-basket text-pink-100 text-5xl mb-3"></i>
            <p className="text-gray-400">Your basket is empty</p>
            <button onClick={() => setView('SHOP')} className="mt-4 text-pink-500 font-bold text-sm">Browse Products</button>
          </div> : (
            <>
              {cart.map((p, i) => (
                <div key={i} className="flex justify-between items-center border-b border-pink-50 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-pink-300"><i className="fas fa-box"></i></div>
                    <span className="text-sm font-semibold text-gray-700">{p.name}</span>
                  </div>
                  <span className="font-bold text-pink-500">${p.price}</span>
                </div>
              ))}
              <div className="pt-4 flex justify-between items-center font-bold text-lg border-t border-pink-100">
                <span className="text-gray-800">Total</span>
                <span className="text-pink-600">${total}</span>
              </div>
              <div className="bg-pink-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-pink-400 uppercase mb-2 tracking-widest">Delivery Address</p>
                <p className="text-xs text-gray-600 font-semibold flex justify-between">
                  Home (Primary) <button className="text-pink-500">Edit</button>
                </p>
              </div>
              <button onClick={() => { alert('Order placed! Your Lume Skin products are on the way.'); setCart([]); setView('HOME'); }} className="w-full bg-pink-400 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-pink-500 transition-colors active:scale-95">
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'CALENDAR') {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('HOME')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-pink-100 text-center shadow-sm">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-calendar-alt text-pink-400 text-3xl"></i>
          </div>
          <h3 className="font-bold text-gray-800">Your Upcoming Lume Sessions</h3>
          <div className="mt-6 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between text-left shadow-sm">
               <div>
                 <p className="text-sm font-bold text-gray-800">General Consultation</p>
                 <p className="text-[10px] text-gray-400">Dr. Sarah Johnson • 15 March, 10:00 AM</p>
               </div>
               <span className="bg-blue-50 text-blue-500 text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">Online</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between text-left shadow-sm">
               <div>
                 <p className="text-sm font-bold text-gray-800">Laser Therapy</p>
                 <p className="text-[10px] text-gray-400">Dr. Marcus Chen • 20 March, 02:00 PM</p>
               </div>
               <span className="bg-orange-50 text-orange-500 text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-widest">Physical</span>
            </div>
          </div>
          <button onClick={() => setView('BOOK')} className="mt-8 bg-pink-400 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-95">Book New Slot</button>
        </div>
      </div>
    );
  }

  if (currentView === 'PROFILE') {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('HOME')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 flex flex-col items-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-16 bg-pink-50"></div>
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md overflow-hidden mb-4 z-10">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
          <div className="mt-6 w-full space-y-3">
            <button onClick={() => setView('HISTORY')} className="w-full bg-pink-50 text-pink-500 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 border border-pink-100">
               <i className="fas fa-notes-medical"></i>
               <span>Medical History</span>
            </button>
            <button onClick={() => alert('Editing profile...')} className="w-full py-3 text-gray-500 font-bold text-sm border border-gray-100 rounded-xl">Edit Details</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      <header className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Hi, {user.name.split(' ')[0]}!</h2>
          <p className="text-gray-500 text-sm">Time to glow today.</p>
        </div>
        <div onClick={() => setView('PROFILE')} className="w-12 h-12 bg-pink-200 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden cursor-pointer active:scale-95 transition-transform">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
        </div>
      </header>

      <div onClick={() => setView('ANALYSIS')} className="bg-gradient-to-br from-pink-400 to-pink-300 p-6 rounded-3xl shadow-lg text-white cursor-pointer hover:scale-[1.01] transition-all relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div className="max-w-[70%]">
            <h3 className="text-xl font-bold mb-1">AI Skin Scan</h3>
            <p className="text-pink-50 text-xs font-medium">Discover your skin's true needs with Gemini AI.</p>
            <div className="mt-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold inline-block border border-white/20">Try It Free</div>
          </div>
          <i className="fas fa-wand-magic-sparkles text-6xl opacity-30"></i>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => setView('SHOP')} className="bg-white p-5 rounded-3xl border border-pink-100 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors shadow-sm group">
          <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform"><i className="fas fa-shopping-bag"></i></div>
          <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">Store</span>
        </div>
        <div onClick={() => setView('BOOK')} className="bg-white p-5 rounded-3xl border border-pink-100 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors shadow-sm group">
          <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform"><i className="fas fa-stethoscope"></i></div>
          <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">Book Dr.</span>
        </div>
        <div onClick={() => setView('CHAT')} className="bg-white p-5 rounded-3xl border border-pink-100 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors shadow-sm group">
          <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform"><i className="fas fa-robot"></i></div>
          <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">ChatBot</span>
        </div>
        <div onClick={() => setView('PROFILE')} className="bg-white p-5 rounded-3xl border border-pink-100 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors shadow-sm group">
          <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform"><i className="fas fa-star"></i></div>
          <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">Profile</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-gray-800">Active Visits</h4>
          <button onClick={() => setView('CALENDAR')} className="text-pink-400 text-xs font-bold">See All</button>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 font-bold text-xs">SJ</div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Dr. Sarah Johnson</p>
              <p className="text-[10px] text-gray-400">Mar 15, 10:00 AM</p>
            </div>
          </div>
          <button onClick={() => alert('Opening consultation link...')} className="bg-pink-400 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-sm active:scale-95 transition-transform">Join</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;






