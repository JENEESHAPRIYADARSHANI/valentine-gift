
import React from 'react';
import { MemoryImage } from '../types';

interface PolaroidCardProps {
  memory: MemoryImage;
  index: number;
  isAdmin?: boolean;
  onDelete?: () => void;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ memory, index, isAdmin, onDelete }) => {
  // Random slight rotation for that messy polaroid look
  const rotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 1);

  return (
    <div 
      className="bg-white p-5 pb-10 shadow-2xl rounded-sm transition-all duration-500 hover:scale-105 hover:z-10 hover:rotate-0 relative group border border-rose-50"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {isAdmin && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if(confirm("Delete this memory?")) onDelete?.();
          }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110 active:scale-95 hover:bg-rose-600"
          title="Delete memory"
        >
          ✕
        </button>
      )}
      
      <div className="relative overflow-hidden aspect-[4/5] bg-rose-50 shadow-inner rounded-sm mb-6">
        <img 
          src={memory.url} 
          alt={memory.caption} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>
      <p className="font-cursive text-rose-500 text-2xl text-center leading-relaxed">
        {memory.caption}
      </p>
      
      {/* Decorative texture to simulate polaroid bottom space */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-rose-100 rounded-full opacity-30"></div>
    </div>
  );
};

export default PolaroidCard;
