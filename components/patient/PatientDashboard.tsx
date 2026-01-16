import React, { useEffect, useState } from 'react';
import { User, Product } from '../../types';
import SkinAnalysis from './SkinAnalysis';
import ProductShop from './ProductShop';
import ConsultationBooking from './ConsultationBooking';
import Chatbot from './Chatbot';
import { PatientViewType } from '../../App';
import { supabase } from '../../supabase'; // ✅ ADDED

interface PatientDashboardProps {
  user: User;
  currentView: PatientViewType;
  setView: (view: PatientViewType) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({
  user,
  currentView,
  setView,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  /* =========================
     LOAD APPOINTMENTS
  ========================= */
  useEffect(() => {
    const loadAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setAppointments(data);
      }
    };

    loadAppointments();
  }, [user.id]);

  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  /* =========================
     SAVE APPOINTMENT
  ========================= */
  const handleBookingConfirm = async (booking: any) => {
    const { data, error } = await supabase.from('appointments').insert([
      {
        patient_id: user.id,
        doctor: booking.doctorName,
        time: `${booking.date}, ${booking.time}`,
        type: 'Physical',
      },
    ]);

    if (!error && data) {
      setAppointments(prev => [data[0], ...prev]);
    }

    setView('HOME');
  };

  /* =========================
     VIEW ROUTING
  ========================= */

  if (currentView === 'ANALYSIS')
    return <SkinAnalysis onBack={() => setView('HOME')} onAddToCart={addToCart} />;

  if (currentView === 'SHOP')
    return (
      <ProductShop
        onBack={() => setView('HOME')}
        onGoToCheckout={() => setView('CHECKOUT')}
        onAddToCart={addToCart}
        cartCount={cart.length}
      />
    );

  if (currentView === 'BOOK')
    return <ConsultationBooking onBack={() => setView('HOME')} onConfirm={handleBookingConfirm} />;

  if (currentView === 'CHAT')
    return <Chatbot onBack={() => setView('HOME')} />;

  /* =========================
     CALENDAR
  ========================= */
  if (currentView === 'CALENDAR') {
    return (
      <div className="space-y-6 pb-20">
        <button onClick={() => setView('HOME')}>← Back</button>

        {appointments.length === 0 && <p>No appointments</p>}

        {appointments.map(app => (
          <div key={app.id} className="p-4 bg-white rounded">
            <p>{app.doctor}</p>
            <p>{app.time}</p>
            <span>{app.type}</span>
          </div>
        ))}
      </div>
    );
  }

  /* =========================
     CHECKOUT
  ========================= */
  if (currentView === 'CHECKOUT') {
    const total = cart.reduce((acc, p) => acc + p.price, 0);

    return (
      <div className="pb-20">
        <button onClick={() => setView('SHOP')}>← Back</button>

        {cart.map((p, i) => (
          <div key={i}>
            {p.name} - ${p.price}
          </div>
        ))}

        <p>Total: ${total}</p>

        <button
          onClick={() => {
            alert('Order placed');
            setCart([]);
            setView('HOME');
          }}
        >
          Complete Purchase
        </button>
      </div>
    );
  }

  /* =========================
     HOME (DEFAULT)
  ========================= */
  return (
    <div className="space-y-6 pb-20">
      <h2>Hi, {user.name}</h2>

      <button onClick={() => setView('ANALYSIS')}>Skin Analysis</button>
      <button onClick={() => setView('SHOP')}>Shop</button>
      <button onClick={() => setView('BOOK')}>Book Doctor</button>
      <button onClick={() => setView('CALENDAR')}>My Appointments</button>
      <button onClick={() => setView('PROFILE')}>Profile</button>
    </div>
  );
};

export default PatientDashboard;

