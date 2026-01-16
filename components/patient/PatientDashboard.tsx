import React, { useEffect, useState } from 'react';
import { User, Product } from '../../types';
import SkinAnalysis from './SkinAnalysis';
import ProductShop from './ProductShop';
import ConsultationBooking from './ConsultationBooking';
import Chatbot from './Chatbot';
import { PatientViewType } from '../../App';

// ✅ CORRECT IMPORT (THIS FIXES YOUR BUILD ERROR)
import { supabase } from '../../../services/db';

interface PatientDashboardProps {
  user: User;
  currentView: PatientViewType;
  setView: (view: PatientViewType) => void;
}

interface Appointment {
  id: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  mode: 'Online' | 'Physical';
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({
  user,
  currentView,
  setView,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  /* ===============================
     DATABASE: FETCH APPOINTMENTS
     =============================== */
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoadingAppointments(true);

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: true });

      if (!error && data) {
        setAppointments(data);
      }

      setLoadingAppointments(false);
    };

    fetchAppointments();
  }, [user.id]);

  /* ===============================
     VIEW ROUTING (UNCHANGED UI)
     =============================== */
  if (currentView === 'ANALYSIS')
    return <SkinAnalysis onBack={() => setView('HOME')} />;

  if (currentView === 'SHOP')
    return (
      <ProductShop
        onBack={() => setView('HOME')}
        onGoToCheckout={() => setView('CHECKOUT')}
        onAddToCart={(p) => setCart([...cart, p])}
        cartCount={cart.length}
      />
    );

  if (currentView === 'BOOK')
    return <ConsultationBooking onBack={() => setView('HOME')} />;

  if (currentView === 'CHAT')
    return <Chatbot onBack={() => setView('HOME')} />;

  /* ===============================
     CHECKOUT
     =============================== */
  if (currentView === 'CHECKOUT') {
    const total = cart.reduce((acc, p) => acc + p.price, 0);

    return (
      <div className="space-y-6 pb-20">
        <button onClick={() => setView('SHOP')}>← Back</button>

        {cart.map((p, i) => (
          <div key={i} className="flex justify-between">
            <span>{p.name}</span>
            <span>${p.price}</span>
          </div>
        ))}

        <div className="font-bold">Total: ${total}</div>

        <button
          onClick={() => {
            alert('Order placed');
            setCart([]);
            setView('HOME');
          }}
        >
          Place Order
        </button>
      </div>
    );
  }

  /* ===============================
     HOME DASHBOARD (MOBILE UI SAFE)
     =============================== */
  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">
            Hi, {user.name.split(' ')[0]}
          </h2>
          <p className="text-sm text-gray-500">Time to glow today</p>
        </div>

        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
      </header>

      {/* AI SCAN */}
      <div
        onClick={() => setView('ANALYSIS')}
        className="bg-pink-400 text-white p-6 rounded-2xl cursor-pointer"
      >
        <h3 className="font-bold text-lg">AI Skin Scan</h3>
        <p className="text-sm">Discover your skin needs</p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setView('SHOP')}>Shop</button>
        <button onClick={() => setView('BOOK')}>Book Doctor</button>
        <button onClick={() => setView('CHAT')}>ChatBot</button>
        <button onClick={() => setView('PROFILE')}>Profile</button>
      </div>

      {/* APPOINTMENTS (DATABASE CONNECTED ✅) */}
      <div>
        <h4 className="font-bold mb-2">Upcoming Appointments</h4>

        {loadingAppointments && <p>Loading...</p>}

        {!loadingAppointments && appointments.length === 0 && (
          <p className="text-sm text-gray-400">
            No appointments booked yet
          </p>
        )}

        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white p-4 rounded-xl border flex justify-between"
          >
            <div>
              <p className="font-bold">{a.doctor_name}</p>
              <p className="text-xs text-gray-400">
                {a.appointment_date} • {a.appointment_time}
              </p>
            </div>
            <span className="text-xs">{a.mode}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;





