
import React, { useState } from 'react';
import { User } from '../../types';

interface DoctorDashboardProps {
  user: User;
  currentView: 'MAIN' | 'HISTORY' | 'SCHEDULE' | 'PROFILE';
  setView: (view: 'MAIN' | 'HISTORY' | 'SCHEDULE' | 'PROFILE') => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, currentView, setView }) => {
  const [isOnline, setIsOnline] = useState(true);

  if (currentView === 'HISTORY') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('MAIN')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">Global Patient Records</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800 text-sm">Patient ID: #LUME-00{i}</p>
                  <p className="text-xs text-gray-500">Last Diagnosis: Chronic Eczema</p>
                </div>
                <button onClick={() => alert('Opening Full File...')} className="text-pink-500 text-xs font-bold">Open File</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === 'SCHEDULE') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('MAIN')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">Manage Availability</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
           <p className="font-bold text-gray-700 mb-4">Set Weekly Hours</p>
           {['Monday', 'Wednesday', 'Friday'].map(day => (
             <div key={day} className="flex justify-between items-center p-4 border-b border-pink-50 last:border-0">
               <span className="text-sm font-semibold text-gray-600">{day}</span>
               <div className="flex items-center space-x-2">
                 <input type="text" defaultValue="09:00" className="w-16 p-1 border rounded text-xs text-center" />
                 <span className="text-gray-400">-</span>
                 <input type="text" defaultValue="17:00" className="w-16 p-1 border rounded text-xs text-center" />
               </div>
             </div>
           ))}
           <button onClick={() => { alert('Schedule updated and synced with Reception!'); setView('MAIN'); }} className="w-full mt-8 py-4 bg-pink-400 text-white rounded-2xl font-bold shadow-md active:scale-95 transition-all">Save & Sync</button>
        </div>
      </div>
    );
  }

  if (currentView === 'PROFILE') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-3">
          <button onClick={() => setView('MAIN')} className="p-2 bg-white rounded-full text-pink-400 shadow-sm"><i className="fas fa-arrow-left"></i></button>
          <h2 className="text-xl font-bold text-gray-800">My Doctor Profile</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 bg-pink-100 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Doctor" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-sm text-pink-400 font-bold uppercase tracking-widest">Senior Dermatologist</p>
          <div className="w-full mt-8 space-y-3">
             <div className="p-4 bg-gray-50 rounded-2xl flex justify-between">
               <span className="text-xs font-bold text-gray-500 uppercase">Total Consultations</span>
               <span className="font-bold">1,248</span>
             </div>
             <button onClick={() => alert('Editing Medical Credentials...')} className="w-full py-3 border-2 border-pink-100 text-pink-500 font-bold rounded-xl text-sm">Update Credentials</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Dr. {user.name.split(' ')[1]}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{isOnline ? 'Active for Consultations' : 'Offline'}</span>
          </div>
        </div>
        <button onClick={() => setIsOnline(!isOnline)} className={`px-4 py-2 rounded-xl text-xs font-bold ${isOnline ? 'bg-pink-50 text-pink-500 border border-pink-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
          {isOnline ? 'Set Away' : 'Set Active'}
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => setView('SCHEDULE')} className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm cursor-pointer hover:bg-pink-50 transition-colors">
          <i className="fas fa-calendar-check text-pink-400 mb-2"></i>
          <p className="font-bold text-gray-800 text-xs">My Shifts</p>
        </div>
        <div onClick={() => setView('HISTORY')} className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm cursor-pointer hover:bg-pink-50 transition-colors">
          <i className="fas fa-folder-open text-pink-400 mb-2"></i>
          <p className="font-bold text-gray-800 text-xs">Global Records</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-800 text-sm flex items-center">
          <i className="fas fa-clock mr-2 text-pink-400"></i> Today's Appointments
        </h3>
        <div className="space-y-3">
          {[{ id: 1, type: 'Physical', name: 'Emma Wood', time: '10:00 AM' }, { id: 2, type: 'Online', name: 'John Doe', time: '11:30 AM' }].map(app => (
            <div key={app.id} className="bg-white p-4 rounded-3xl border border-pink-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-400 font-bold text-xs">
                  {app.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{app.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${app.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>{app.type}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{app.time}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => alert(`Starting ${app.type} Consultation with ${app.name}`)} className="bg-pink-400 text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm active:scale-95 transition-transform">Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
