
import React, { useState } from 'react';

const Chatbot: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am DermaBot. I can help with skincare advice or navigating the app. How can I help today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "I've noted your question. For medical diagnosis, I suggest booking a session with our specialists, but for general care, always remember to apply SPF daily!" 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[80vh] flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <button onClick={onBack} className="p-2 bg-white rounded-full text-pink-400">
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white text-xs">
             <i className="fas fa-robot"></i>
           </div>
           <h2 className="text-xl font-bold text-gray-800">DermaBot</h2>
        </div>
      </div>

      <div className="flex-grow bg-white rounded-3xl border border-pink-100 p-4 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-pink-400 text-white rounded-tr-none' : 'bg-pink-50 text-gray-700 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-2 rounded-2xl border border-pink-100 flex items-center space-x-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-3 text-sm focus:outline-none"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-pink-400 text-white rounded-xl flex items-center justify-center"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
