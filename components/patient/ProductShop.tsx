
import React, { useState } from 'react';
import { Product } from '../../types';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Ultra Glow Serum', price: 45, category: 'Serums', image: 'https://picsum.photos/seed/serum/300/300', description: 'Advanced Vitamin C complex for visible brightness.' },
  { id: '2', name: 'Hydra-Moist Gel', price: 32, category: 'Moisturizers', image: 'https://picsum.photos/seed/moist/300/300', description: 'Lightweight hyaluronic acid for 24h hydration.' },
  { id: '3', name: 'Zit Zap Treatment', price: 18, category: 'Treatments', image: 'https://picsum.photos/seed/zit/300/300', description: 'Targeted salicylic acid for rapid clearance.' },
  { id: '4', name: 'Silk Sunscreen SPF50', price: 24, category: 'Sun Care', image: 'https://picsum.photos/seed/spf/300/300', description: 'Broad-spectrum mineral protection with zero white cast.' },
];

interface ProductShopProps {
  onBack: () => void;
  onGoToCheckout: () => void;
  onAddToCart: (p: Product) => void;
  cartCount: number;
}

const ProductShop: React.FC<ProductShopProps> = ({ onBack, onGoToCheckout, onAddToCart, cartCount }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Serums', 'Moisturizers', 'Treatments', 'Sun Care'];

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 bg-white rounded-full text-pink-400 shadow-sm active:scale-95">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Lume Store</h2>
        </div>
        <button onClick={onGoToCheckout} className="relative p-2.5 bg-white rounded-full text-pink-400 shadow-sm active:scale-95 border border-pink-50">
          <i className="fas fa-shopping-cart text-lg"></i>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scroll-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-pink-400 text-white border-pink-400 shadow-md' : 'bg-white text-gray-400 border-gray-100 hover:border-pink-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-[2rem] p-3 border border-pink-100 shadow-sm flex flex-col group hover:shadow-md transition-shadow">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img src={product.image} className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
              <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full text-pink-400 flex items-center justify-center"><i className="far fa-heart text-xs"></i></button>
            </div>
            <div className="p-2 flex-grow flex flex-col">
              <p className="text-[9px] font-bold text-pink-300 uppercase tracking-tighter mb-1">{product.category}</p>
              <h3 className="font-bold text-gray-800 text-xs mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-[9px] text-gray-400 line-clamp-2 mb-3 leading-tight">{product.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-black text-pink-500 text-sm">${product.price}</span>
                <button 
                  onClick={() => { onAddToCart(product); alert(`${product.name} added to cart!`); }}
                  className="bg-pink-400 text-white w-9 h-9 rounded-2xl flex items-center justify-center shadow-md active:scale-90 transition-transform"
                >
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {cartCount > 0 && (
        <div className="fixed bottom-24 left-6 right-6 z-40 animate-slideUp">
          <button onClick={onGoToCheckout} className="w-full bg-pink-400 text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center space-x-3 transition-transform active:scale-[0.98]">
            <i className="fas fa-shopping-basket"></i>
            <span className="text-sm">View Your Basket ({cartCount})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductShop;
