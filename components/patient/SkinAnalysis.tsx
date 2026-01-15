
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface SkinAnalysisProps {
  onBack: () => void;
  onAddToCart?: (productName: string) => void;
}

const SkinAnalysis: React.FC<SkinAnalysisProps> = ({ onBack, onAddToCart }) => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkin = async () => {
    if (!image) return;
    setAnalyzing(true);
    setResult(null);
    
    try {
      // Real API initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      // In a real app, we'd send the image to gemini-3-flash-preview
      // Simulating a high-quality response for the functional demo
      setTimeout(() => {
        setResult({
          condition: "Localized Dehydration",
          confidence: 92,
          advice: "Your skin barrier shows signs of stress. Focus on ceramide-rich products and avoid harsh physical exfoliants for 2 weeks.",
          products: [
            { id: '2', name: "Hydra-Moist Gel", price: 32 },
            { id: '4', name: "Silk Sunscreen SPF50", price: 24 }
          ]
        });
        setAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setAnalyzing(false);
      alert("Analysis failed. Please try again.");
    }
  };

  const handleAddToCart = (product: any) => {
    if (onAddToCart) {
      onAddToCart(product);
      alert(`${product.name} added to your shop cart!`);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex items-center space-x-3">
        <button onClick={onBack} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold text-gray-800">AI Skin Analysis</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-pink-100 text-center space-y-6 shadow-sm">
        {!image ? (
          <div className="border-2 border-dashed border-pink-200 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 bg-pink-50/30">
            <i className="fas fa-camera text-4xl text-pink-300"></i>
            <p className="text-gray-500 text-sm font-medium">Take a photo of the area of concern</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
              id="skin-upload" 
            />
            <label 
              htmlFor="skin-upload" 
              className="bg-pink-400 text-white px-8 py-3 rounded-2xl font-bold cursor-pointer hover:bg-pink-500 shadow-md active:scale-95 transition-all"
            >
              Open Camera
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative group">
              <img src={image} className="w-full max-h-72 object-cover rounded-2xl mx-auto shadow-md border-4 border-white" alt="Preview" />
              <button onClick={() => setImage(null)} className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full"><i className="fas fa-times"></i></button>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setImage(null)} 
                className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-500 active:scale-95"
              >
                Retake
              </button>
              <button 
                onClick={analyzeSkin} 
                disabled={analyzing}
                className="flex-[2] py-3 bg-pink-400 text-white rounded-xl font-bold shadow-lg active:scale-95 disabled:opacity-50"
              >
                {analyzing ? (
                  <span className="flex items-center justify-center"><i className="fas fa-spinner animate-spin mr-2"></i> Scanning...</span>
                ) : 'Start AI Analysis'}
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="text-left bg-gradient-to-b from-pink-50 to-white p-5 rounded-2xl border border-pink-100 animate-slideIn">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800 text-lg">{result.condition}</h3>
              <span className="bg-green-100 text-green-600 text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-widest">{result.confidence}% Match</span>
            </div>
            <p className="text-gray-600 text-xs mb-6 leading-relaxed bg-white/50 p-3 rounded-xl border border-pink-50 italic">"{result.advice}"</p>
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Prescribed Routine</p>
              {result.products.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-pink-50 group hover:border-pink-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-400"><i className="fas fa-pills text-xs"></i></div>
                    <span className="text-xs font-bold text-gray-700">{p.name}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(p)}
                    className="bg-pink-400 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm active:scale-90"
                  >
                    Add ${p.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinAnalysis;
