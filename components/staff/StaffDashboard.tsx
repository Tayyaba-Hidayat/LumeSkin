
import React, { useState } from 'react';

const StaffDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState([
    { id: '1', patient: 'Alice Smith', doctor: 'Dr. Johnson', time: '14:00', payment: 'PAID', type: 'Physical' },
    { id: '2', patient: 'Bob Brown', doctor: 'Dr. Sarah', time: '14:30', payment: 'PENDING', type: 'Online' },
    { id: '3', patient: 'Charlie Davis', doctor: 'Dr. Johnson', time: '15:00', payment: 'PENDING', type: 'Physical' },
  ]);

  const handleSendReminders = () => {
    alert('SMS and Email reminders sent to all patients for today!');
  };

  const handleConfirmPayment = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? {...a, payment: 'PAID'} : a));
    alert('Payment confirmed and receipt generated.');
  };

  const handleAddAppointment = () => {
    alert('New appointment booking form opened.');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reception Desk</h2>
          <p className="text-gray-500 text-sm">Managing flow and schedules</p>
        </div>
        <button onClick={handleAddAppointment} className="w-12 h-12 bg-pink-400 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
          <i className="fas fa-plus text-xl"></i>
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={handleSendReminders} className="bg-white p-4 rounded-3xl border border-pink-100 flex flex-col items-center space-y-2 hover:bg-pink-50 transition-colors shadow-sm">
          <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500">
            <i className="fas fa-paper-plane"></i>
          </div>
          <span className="text-[10px] font-bold text-gray-700 uppercase">Send Reminders</span>
        </button>
        <button onClick={() => alert('Opening schedule management...')} className="bg-white p-4 rounded-3xl border border-pink-100 flex flex-col items-center space-y-2 hover:bg-pink-50 transition-colors shadow-sm">
          <div className="w-10 h-10 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500">
            <i className="fas fa-user-md"></i>
          </div>
          <span className="text-[10px] font-bold text-gray-700 uppercase">Manage Doctors</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="bg-pink-50 p-4 border-b border-pink-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm">Active Queue</h3>
          <span className="text-[10px] font-bold text-pink-500 bg-white px-2 py-1 rounded-full border border-pink-100">Live</span>
        </div>
        <div className="divide-y divide-pink-50">
          {appointments.map(app => (
            <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-gray-800 text-sm">{app.patient}</p>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${app.type === 'Online' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>{app.type}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">{app.time}</span>
                  <span className="text-[10px] text-gray-400">with {app.doctor}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {app.payment === 'PENDING' ? (
                  <button onClick={() => handleConfirmPayment(app.id)} className="text-[10px] font-bold text-white bg-pink-400 px-3 py-1.5 rounded-xl shadow-sm active:scale-95 transition-transform">
                    Confirm $
                  </button>
                ) : (
                  <span className="text-green-500 text-sm"><i className="fas fa-check-circle"></i></span>
                )}
                <button onClick={() => alert('Opening appointment options...')} className="p-2 text-gray-300 hover:text-pink-400"><i className="fas fa-ellipsis-v text-xs"></i></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-pink-100 text-center shadow-sm">
        <div className="flex justify-around mb-4">
           <div className="text-center">
             <p className="text-xs font-bold text-gray-400 uppercase">Doctors On-Site</p>
             <p className="text-lg font-bold text-pink-500">3</p>
           </div>
           <div className="text-center">
             <p className="text-xs font-bold text-gray-400 uppercase">Wait Time</p>
             <p className="text-lg font-bold text-pink-500">~15m</p>
           </div>
        </div>
        <button onClick={() => alert('Roster detail view coming soon.')} className="w-full bg-pink-50 text-pink-500 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest border border-pink-100">
          View Full Staff Roster
        </button>
      </div>
    </div>
  );
};

export default StaffDashboard;
