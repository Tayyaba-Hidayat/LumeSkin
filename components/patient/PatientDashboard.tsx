// PatientDashboard.tsx
// UI unchanged ✅
// Supabase connected for: patients, appointments, products, history, orders

import React, { useEffect, useState } from 'react';
import { User, Product } from '../../types';
import SkinAnalysis from './SkinAnalysis';
import ProductShop from './ProductShop';
import ConsultationBooking from './ConsultationBooking';
import Chatbot from './Chatbot';
import { PatientViewType } from '../../App';
import { db } from '../../services/db';
import { supabase } from '../../supabase';

interface PatientDashboardProps {
  user: User;
  currentView: PatientViewType;
  setView: (view: PatientViewType) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, currentView, setView }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  /* =========================
     LOAD PATIENT-RELATED DATA
  ========================= */
  useEffect(() => {
    if (!user?.id) return;

    // Appointments
    db.appointments.getByPatient(user.id).then(({ data }) => {
      if (data) setAppointments(data);
    });

    // Products
    db.products.getAll().then(({ data }) => {
      if (data) setProducts(data as Product[]);
    });

    // Medical History
    supabase
      .from('medical_history')
      .select('*')
      .eq('patient_id', user.id)
      .then(({ data }) => {
        if (data) setHistory(data);
      });
  }, [user.id]);

  /* =========================
     CART
  ========================= */
  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  /* =========================
     BOOK APPOINTMENT
  ========================= */
  const handleBookingConfirm = async (booking: any) => {
    const { data } = await db.appointments.create({
      patient_id: user.id,
      doctor: booking.doctorName,
      time: `${booking.date}, ${booking.time}`,
      type: 'Physical',
    });

    if (data) setAppointments(prev => [data[0], ...prev]);
    setView('HOME');
  };

  /* =========================
     VIEW ROUTING
  ========================= */

  if (currentView === 'ANALYSIS') return <SkinAnalysis onBack={() => setView('HOME')} />;

  if (currentView === 'SHOP')
    return (
      <ProductShop
        products={products}
        onBack={() => setView('HOME')}
        onGoToCheckout={() => setView('CHECKOUT')}
        onAddToCart={addToCart}
        cartCount={cart.length}
      />
    );

  if (currentView === 'BOOK')
    return <ConsultationBooking onBack={() => setView('HOME')} onConfirm={handleBookingConfirm} />;

  if (currentView === 'CHAT') return <Chatbot onBack={() => setView('HOME')} />;

  if (currentView === 'HISTORY') {
    return (
      <div className="space-y-4 pb-20">
        <button onClick={() => setView('HOME')}>← Back</button>
        {history.length === 0 && <p>No medical history found.</p>}
        {history.map(h => (
          <div key={h.id} className="bg-white p-4 rounded shadow">
            <p className="font-bold">{h.title}</p>
            <p className="text-sm">{h.notes}</p>
          </div>
        ))}
      </div>
    );
  }

  if (currentView === 'CHECKOUT') {
    const total = cart.reduce((acc, p) => acc + p.price, 0);

    return (
      <div className="pb-20 space-y-4">
        <button onClick={() => setView('SHOP')}>← Back</button>

        {cart.map((p, i) => (
          <div key={i}>{p.name} - ${p.price}</div>
        ))}

        <p>Total: ${total}</p>

        <button
          onClick={async () => {
            await supabase.from('orders').insert({
              patient_id: user.id,
              total,
            });
            setCart([]);
            setView('HOME');
          }}
        >
          Place Order
        </button>
      </div>
    );
  }

  if (currentView === 'CALENDAR') {
    return (
      <div className="pb-20 space-y-4">
        <button onClick={() => setView('HOME')}>← Back</button>
        {appointments.length === 0 && <p>No appointments</p>}
        {appointments.map(app => (
          <div key={app.id} className="bg-white p-4 rounded">
            <p>{app.doctor}</p>
            <p>{app.time}</p>
          </div>
        ))}
      </div>
    );
  }

  /* =========================
     HOME
  ========================= */
  return (
    <div className="space-y-4 pb-20">
      <h2>Hi, {user.name}</h2>
      <button onClick={() => setView('ANALYSIS')}>Skin Analysis</button>
      <button onClick={() => setView('SHOP')}>Shop</button>
      <button onClick={() => setView('BOOK')}>Book Doctor</button>
      <button onClick={() => setView('CALENDAR')}>Appointments</button>
      <button onClick={() => setView('HISTORY')}>History</button>
      <button onClick={() => setView('PROFILE')}>Profile</button>
    </div>
  );
};

export default PatientDashboard;




