
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
  const [appointments, setAppointments] = useState([
    { id: '1', title: 'General Consultation', doctor: 'Dr. Sarah Johnson', time: '15 March, 10:00 AM', type: 'Online' }
  ]);

  const addToCart = (product: any) => {
    // If it's a minimal object from Analysis, we match it to a full product
    setCart(prev => [...prev, product as Product]);
  };

  const handleBookingConfirm = (booking: any) => {
    setAppointments(prev => [{
      id: Math.random().toString(),
      title: 'Consultation',
      doctor: booking.doctorName,
      time: `${booking.date}, ${booking.time}`,
      type: 'Physical'
    }, ...prev]);
    setView('HOME');
  };

  if (currentView === 'ANALYSIS') return <SkinAnalysis onBack={() => setView('HOME')} onAddToCart={addToCart} />;
  if (currentView === 'SHOP') return <ProductShop onBack={() => setView('HOME')} onGoToCheckout={() => setView('CHECKOUT')} onAddToCart={addToCart} cartCount={cart.length} />;
  if (currentView === 'BOOK') return <ConsultationBooking onBack={() => setView('HOME')} onConfirm={handleBookingConfirm} />;
  if (currentView === 'CHAT') return <Chatbot onBack={() => setView('HOME')} />;
  
  if (currentView === 'HISTORY') {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('HOME')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95 transition-transform"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">My Glow Journey</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm border-l-4 border-l-pink-400">
            <div className="flex justify-between mb-2">
              <p className="font-bold text-gray-800 text-sm">AI Scan Result</p>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Today</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Skin Type identified: Oily-Combination. Sensitivity noted around cheek area.</p>
            <div className="flex space-x-2">
               <button onClick={() => alert('Opening PDF prescription...')} className="text-[10px] font-bold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-lg active:scale-95"><i className="fas fa-file-download mr-1"></i> Prescription</button>
               <button onClick={() => setView('SHOP')} className="text-[10px] font-bold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-lg active:scale-95"><i className="fas fa-tags mr-1"></i> Shop Routine</button>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm opacity-70">
            <div className="flex justify-between mb-2">
              <p className="font-bold text-gray-800 text-sm">Routine Checkup</p>
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
          <button onClick={() => setView('SHOP')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">Review Cart</h2>
        </div>
        <div className="bg-white rounded-3xl border border-pink-100 p-6 space-y-4 shadow-sm">
          {cart.length === 0 ? (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shopping-basket text-pink-200 text-3xl"></i>
              </div>
              <p className="text-gray-400 font-medium">Your basket is empty</p>
              <button onClick={() => setView('SHOP')} className="mt-4 bg-pink-50 text-pink-500 px-6 py-2 rounded-xl font-bold text-sm">Browse Products</button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((p, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-pink-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-pink-300 border border-pink-100 shadow-sm"><i className="fas fa-box text-xs"></i></div>
                      <div>
                        <p className="text-xs font-bold text-gray-700">{p.name}</p>
                        <p className="text-[10px] text-gray-400">Standard Delivery</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-pink-500 text-sm">${p.price}</span>
                      <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-red-300 hover:text-red-500"><i className="fas fa-times-circle text-sm"></i></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-between items-center font-bold text-lg border-t border-pink-100">
                <span className="text-gray-800">Total</span>
                <span className="text-pink-600">${total}</span>
              </div>
              <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                <p className="text-[10px] font-extrabold text-pink-400 uppercase mb-2 tracking-widest">Delivery Address</p>
                <div className="flex justify-between items-start">
                  <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                    123 Glow Avenue, Suite 4<br/>Radiance City, 54321
                  </p>
                  <button onClick={() => alert('Edit Address modal')} className="text-pink-500 font-bold text-[10px] underline uppercase">Edit</button>
                </div>
              </div>
              <button 
                onClick={() => { 
                  alert('Order successfully placed! Receipt sent to email.'); 
                  setCart([]); 
                  setView('HOME'); 
                }} 
                className="w-full bg-pink-400 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-pink-500 transition-colors active:scale-95"
              >
                Complete Purchase
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
          <button onClick={() => setView('HOME')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-calendar-check text-pink-400 text-2xl"></i>
          </div>
          <h3 className="font-bold text-gray-800 text-sm">Your Lume Schedule</h3>
          
          <div className="mt-6 space-y-4">
            {appointments.length > 0 ? appointments.map(app => (
              <div key={app.id} className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between text-left shadow-sm group hover:border-pink-300 transition-colors">
                 <div>
                   <p className="text-sm font-bold text-gray-800">{app.title}</p>
                   <p className="text-[10px] text-gray-400 font-medium">{app.doctor} • {app.time}</p>
                 </div>
                 <div className="flex items-center space-x-2">
                   <span className={`text-[8px] font-extrabold px-2 py-1 rounded-full uppercase tracking-tighter ${app.type === 'Online' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>{app.type}</span>
                   <button onClick={() => alert('Cancelling Appointment...')} className="text-gray-300 hover:text-red-400 p-1"><i className="fas fa-trash-alt text-[10px]"></i></button>
                 </div>
              </div>
            )) : (
              <p className="text-gray-400 text-xs py-10">No upcoming appointments.</p>
            )}
          </div>
          
          <button onClick={() => setView('BOOK')} className="w-full mt-8 bg-pink-400 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-transform active:scale-95">Book New Session</button>
        </div>
      </div>
    );
  }

  if (currentView === 'PROFILE') {
    return (
      <div className="space-y-6 animate-fadeIn pb-20">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('HOME')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 flex flex-col items-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-16 bg-pink-50"></div>
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md overflow-hidden mb-4 z-10">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-400 mb-6">{user.email}</p>
          
          <div className="grid grid-cols-2 gap-3 w-full mb-6">
            <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 text-center">
              <p className="text-[10px] font-bold text-pink-400 uppercase">Visits</p>
              <p className="text-lg font-black text-gray-700">12</p>
            </div>
            <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 text-center">
              <p className="text-[10px] font-bold text-pink-400 uppercase">Rewards</p>
              <p className="text-lg font-black text-gray-700">450</p>
            </div>
          </div>

          <div className="w-full space-y-3">
            <button onClick={() => setView('HISTORY')} className="w-full bg-pink-50 text-pink-500 py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 border border-pink-100 active:scale-95">
               <i className="fas fa-file-medical"></i>
               <span>Medical Records</span>
            </button>
            <button onClick={() => alert('Account Settings opened')} className="w-full py-3 text-gray-500 font-bold text-xs border border-gray-100 rounded-xl active:scale-95">Account Settings</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      <header className="flex items-center justify-between px-1">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Hi, {user.name.split(' ')[0]}!</h2>
          <p className="text-gray-500 text-xs font-semibold">Your skin health is looking great.</p>
        </div>
        <div onClick={() => setView('PROFILE')} className="w-11 h-11 bg-pink-200 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden cursor-pointer active:scale-90 transition-transform">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
        </div>
      </header>

      <div onClick={() => setView('ANALYSIS')} className="bg-gradient-to-br from-pink-400 to-pink-300 p-6 rounded-3xl shadow-lg text-white cursor-pointer group relative overflow-hidden active:scale-[0.98] transition-all">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="max-w-[70%]">
            <span className="bg-white/20 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-2 inline-block">New Version 2.0</span>
            <h3 className="text-xl font-bold mb-1">Analyze Your Skin</h3>
            <p className="text-pink-50 text-[11px] font-medium leading-tight">Get instant dermatologist-grade diagnosis with our AI.</p>
            <div className="mt-4 bg-white text-pink-500 px-5 py-2 rounded-xl text-xs font-bold inline-block shadow-md">Scan Now</div>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <i className="fas fa-bolt text-3xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => setView('SHOP')} className="bg-white p-5 rounded-3xl border border-pink-100 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors shadow-sm active:scale-95 group">
          <div className="w-11 h-11 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform"><i className="fas fa-shopping-basket"></i></div>
          <span className="font-bold text-gray-700 text-[10px] uppercase tracking-widest">Shop Lume</span>
        </div>
        <div onClick={() => setView('BOOK')} className="bg-white p-5 rounded-3xl border border-pink-100 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors shadow-sm active:scale-95 group">
          <div className="w-11 h-11 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400 mb-3 group-hover:scale-110 transition-transform"><i className="fas fa-stethoscope"></i></div>
          <span className="font-bold text-gray-700 text-[10px] uppercase tracking-widest">Doctors</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h4 className="font-bold text-gray-800 text-sm">Active Schedule</h4>
          <button onClick={() => setView('CALENDAR')} className="text-pink-400 text-[10px] font-black uppercase tracking-widest">Manage All</button>
        </div>
        {appointments.length > 0 ? (
          <div className="bg-white p-4 rounded-3xl border border-pink-100 flex items-center justify-between shadow-sm border-l-4 border-l-pink-400">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 font-bold text-[10px]">
                {appointments[0].doctor.split(' ')[1].charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-xs">{appointments[0].doctor}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{appointments[0].time}</p>
              </div>
            </div>
            <button onClick={() => alert('Starting session...')} className="bg-pink-400 text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-md active:scale-95">Join Link</button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl border border-dashed border-pink-200 text-center">
            <p className="text-gray-400 text-xs font-medium">No sessions booked yet.</p>
          </div>
        )}
      </div>

      <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-400"><i className="fas fa-question-circle"></i></div>
          <div>
            <p className="text-xs font-bold text-gray-800">Need expert advice?</p>
            <p className="text-[10px] text-gray-400 font-medium">Chat with our 24/7 skin assistant.</p>
          </div>
        </div>
        <button onClick={() => setView('CHAT')} className="bg-pink-100 text-pink-500 w-10 h-10 rounded-2xl flex items-center justify-center active:scale-90"><i className="fas fa-arrow-right"></i></button>
      </div>
    </div>
  );
};

export default PatientDashboard;
