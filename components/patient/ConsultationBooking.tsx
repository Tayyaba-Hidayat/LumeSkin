
import React, { useState } from 'react';

interface BookingProps {
  onBack: () => void;
  onConfirm: (booking: any) => void;
}

const ConsultationBooking: React.FC<BookingProps> = ({ onBack, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');

  const doctors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Acne Specialist', img: 'https://picsum.photos/seed/d1/200/200', rating: 4.9 },
    { id: '2', name: 'Dr. Marcus Chen', specialty: 'Anti-Aging', img: 'https://picsum.photos/seed/d2/200/200', rating: 4.8 },
  ];

  const handleFinalConfirm = () => {
    onConfirm({
      doctorName: selectedDoctor.name,
      date: `${selectedDate} March`,
      time: selectedTime
    });
    alert('Booking Confirmed! You can find this in your schedule.');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex items-center space-x-3">
        <button onClick={onBack} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold text-gray-800">Book Session</h2>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 text-sm px-1 uppercase tracking-widest text-[10px]">Select Specialist</h3>
          {doctors.map(doc => (
            <div 
              key={doc.id}
              onClick={() => { setSelectedDoctor(doc); setStep(2); }}
              className="bg-white p-4 rounded-3xl border border-pink-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-pink-300 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={doc.img} className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-50" alt={doc.name} />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{doc.name}</h4>
                  <p className="text-[10px] text-pink-400 font-bold uppercase">{doc.specialty}</p>
                  <div className="flex items-center text-[10px] text-yellow-400 mt-1 font-bold">
                    <i className="fas fa-star mr-1"></i>
                    <span className="text-gray-500">{doc.rating} Rating</span>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-300">
                <i className="fas fa-chevron-right text-xs"></i>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-3xl border border-pink-100 space-y-6 animate-slideIn shadow-sm">
          <div className="flex items-center justify-between border-b border-pink-50 pb-4">
             <div className="flex items-center space-x-3">
               <img src={selectedDoctor.img} className="w-10 h-10 rounded-xl object-cover" alt="" />
               <div>
                 <p className="text-xs font-bold text-gray-800">{selectedDoctor.name}</p>
                 <p className="text-[9px] text-pink-400 font-bold uppercase">{selectedDoctor.specialty}</p>
               </div>
             </div>
             <button onClick={() => setStep(1)} className="text-[10px] font-bold text-gray-400 underline">Change</button>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 text-xs uppercase tracking-widest">Select Date</h3>
            <div className="flex space-x-2 overflow-x-auto pb-2 scroll-hide">
              {[14, 15, 16, 17, 18, 19, 20].map(day => (
                <button 
                  key={day} 
                  onClick={() => setSelectedDate(day)}
                  className={`flex-shrink-0 w-12 py-3 text-center rounded-2xl border transition-all ${selectedDate === day ? 'bg-pink-400 text-white border-pink-400 shadow-md' : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-pink-200'}`}
                >
                  <p className="text-[8px] uppercase font-black">Mar</p>
                  <p className="text-sm font-black">{day}</p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
             <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Available Slots</h4>
             <div className="grid grid-cols-3 gap-2">
               {['09:00 AM', '10:30 AM', '02:00 PM', '04:15 PM'].map(time => (
                 <button 
                  key={time} 
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-1 rounded-xl text-[10px] font-bold transition-all border ${selectedTime === time ? 'bg-pink-100 text-pink-500 border-pink-300' : 'bg-white text-gray-400 border-gray-100'}`}
                 >
                   {time}
                 </button>
               ))}
             </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleFinalConfirm}
              className="w-full bg-pink-400 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-pink-500 active:scale-95 transition-all"
            >
              Confirm Appointment
            </button>
            <p className="text-[9px] text-gray-400 text-center mt-3 font-medium">By confirming, you agree to our 24h cancellation policy.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationBooking;
