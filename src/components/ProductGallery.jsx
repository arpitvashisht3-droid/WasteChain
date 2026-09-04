import React, { useState } from 'react';

export const ProductGallery = ({ images = [] }) => {
  const defaultImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=800&auto=format&fit=crop&q=80'
  ];

  const [activeImage, setActiveImage] = useState(defaultImages[0]);

  return (
    <div className="space-y-3">
      {/* Large Main Image */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
        <img
          src={activeImage}
          alt="Product gallery main"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails Row */}
      {defaultImages.length > 1 && (
        <div className="flex gap-3">
          {defaultImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImage === img ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
