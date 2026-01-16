import React, { useEffect, useState } from 'react';
import { User, Product } from '../../types';
import SkinAnalysis from './SkinAnalysis';
import ProductShop from './ProductShop';
import ConsultationBooking from './ConsultationBooking';
import Chatbot from './Chatbot';
import { PatientViewType } from '../../App';
import { db } from '../../services'; // ✅ USE SERVICES

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
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD APPOINTMENTS
  ========================= */
  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      const { data, error } = await db.appointments.getByPatient(user.id);
      if (!error && data) setAppointments(data);
      setLoading(false);
    };

    if (user?.id) loadAppointments();
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
    const { data, error } = await db.appointments.create({
      patient_id: user.id,
      doctor: booking.doctorName,
      time: `${booking.date}, ${booking.time}`,
      type: 'Physical',
    });

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
    return (
      <ConsultationBooking
        onBack={() => setView('HOME')}
        onConfirm={handleBookingConfirm}
      />
    );

  if (currentView === 'CHAT')
    return <Chatbot onBack={() => setView('HOME')} />;

  /* =========================
     CALENDAR (APPOINTMENTS)
  ========================= */
  if (currentView === 'CALENDAR') {
    return (
      <div className="space-y-4 pb-20">
        <button onClick={() => setView('HOME')}>← Back</button>

        {loading && <p>Loading...</p>}
        {!loading && appointments.length === 0 && <p>No appointments</p>}

        {appointments.map(app => (
          <div key={app.id} className="p-4 bg-white rounded shadow">
            <p><strong>{app.doctor}</strong></p>
            <p>{app.time}</p>
            <span>{app.type}</span>
          </div>
        ))}
      </div>
    );
  }

  /* =========================
     CHECKOUT → SAVE ORDER
  ========================= */
  if (currentView === 'CHECKOUT') {
    const total = cart.reduce((acc, p) => acc + p.price, 0);

    const placeOrder = async () => {
      await db.orders.create({
        patient_id: user.id,
        total,
        items: cart,
      });

      await db.history.create({
        patient_id: user.id,
        action: 'Order placed',
        meta: cart,
      });

      alert('Order placed');
      setCart([]);
      setView('HOME');
    };

    return (
      <div className="pb-20 space-y-4">
        <button onClick={() => setView('SHOP')}>← Back</button>

        {cart.map((p, i) => (
          <div key={i}>
            {p.name} - ${p.price}
          </div>
        ))}

        <p><strong>Total:</strong> ${total}</p>

        <button onClick={placeOrder}>
          Complete Purchase
        </button>
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
      <button onClick={() => setView('CALENDAR')}>My Appointments</button>
      <button onClick={() => setView('PROFILE')}>Profile</button>
    </div>
  );
};

export default PatientDashboard;



