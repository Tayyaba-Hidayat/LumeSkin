import React, { useState } from 'react';

type Screen =
  | 'dashboard'
  | 'addAppointment'
  | 'manageDoctors'
  | 'queueOptions'
  | 'roster';

const StaffDashboard: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('dashboard');

  const appointments = [
    { id: '1', patient: 'Alice Smith', doctor: 'Dr. Johnson', time: '14:00', payment: 'PAID', type: 'Physical' },
    { id: '2', patient: 'Bob Brown', doctor: 'Dr. Sarah', time: '14:30', payment: 'PENDING', type: 'Online' },
    { id: '3', patient: 'Charlie Davis', doctor: 'Dr. Johnson', time: '15:00', payment: 'PENDING', type: 'Physical' },
  ];

  const BackButton = () => (
    <button
      onClick={() => setScreen('dashboard')}
      className="mb-4 text-sm font-bold text-pink-500"
    >
      ← Back
    </button>
  );

  /* ---------------- SCREENS ---------------- */

  if (screen === 'addAppointment') {
    return (
      <div className="p-6">
        <BackButton />
        <h1 className="text-xl font-bold">Add Appointment</h1>
        <p>Appointment booking form goes here.</p>
      </div>
    );
  }

  if (screen === 'manageDoctors') {
    return (
      <div className="p-6">
        <BackButton />
        <h1 className="text-xl font-bold">Manage Doctors</h1>
        <p>Add, edit, or remove doctors here.</p>
      </div>
    );
  }

  if (screen === 'queueOptions') {
    return (
      <div className="p-6">
        <BackButton />
        <h1 className="text-xl font-bold">Appointment Options</h1>
        <p>Reschedule, cancel, or view appointment details.</p>
      </div>
    );
  }

  if (screen === 'roster') {
    return (
      <div className="p-6">
        <BackButton />
        <h1 className="text-xl font-bold">Staff Roster</h1>
        <p>Full staff schedule and availability.</p>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  return (
    <div className="space-y-6 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reception Desk</h2>
          <p className="text-sm text-gray-500">Managing flow and schedules</p>
        </div>
        <button
          onClick={() => setScreen('addAppointment')}
          className="w-12 h-12 bg-pink-400 text-white rounded-2xl"
        >
          +
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => alert('Reminders sent')}
          className="bg-white p-4 rounded-2xl"
        >
          Send Reminders
        </button>

        <button
          onClick={() => setScreen('manageDoctors')}
          className="bg-white p-4 rounded-2xl"
        >
          Manage Doctors
        </button>
      </div>

      <div className="bg-white rounded-2xl">
        {appointments.map(app => (
          <div
            key={app.id}
            className="p-4 flex justify-between border-b"
          >
            <div>
              <p className="font-bold">{app.patient}</p>
              <p className="text-xs text-gray-400">
                {app.time} with {app.doctor}
              </p>
            </div>

            <button
              onClick={() => setScreen('queueOptions')}
              className="text-sm text-pink-500"
            >
              Options
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setScreen('roster')}
        className="w-full bg-pink-50 text-pink-500 py-3 rounded-2xl"
      >
        View Full Staff Roster
      </button>
    </div>
  );
};

export default StaffDashboard;

 
