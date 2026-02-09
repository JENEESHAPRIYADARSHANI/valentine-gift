
import React, { useState } from 'react';
import { LoveLetter } from '../types';

interface LetterCardProps {
  letter: LoveLetter;
  isAdmin?: boolean;
  onDelete?: () => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, isAdmin, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group w-full">
      {/* Delete button for Admin */}
      {isAdmin && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if(confirm("Delete this letter?")) onDelete?.();
          }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all z-30 hover:scale-110 active:scale-95 hover:bg-rose-600"
        >
          ✕
        </button>
      )}

      {/* Decorative stacked effect */}
      <div className="absolute inset-0 bg-rose-100 rounded-[2rem] rotate-2 scale-[1.02] opacity-50"></div>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative cursor-pointer bg-white p-10 rounded-[2rem] shadow-xl border border-rose-50 transition-all duration-500 ${isOpen ? 'z-40 scale-105' : 'hover:-translate-y-3'}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-cursive text-3xl text-rose-600 truncate mr-4">{letter.title}</h3>
          <div className={`text-3xl transition-transform duration-700 ${isOpen ? 'rotate-[360deg] scale-125' : 'group-hover:scale-110'}`}>
            {isOpen ? '💖' : '✉️'}
          </div>
        </div>
        
        <div className={`transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 mt-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="h-px bg-rose-50 mb-8 w-1/3 mx-auto"></div>
          <p className="text-gray-700 leading-loose italic text-xl whitespace-pre-line mb-10 px-4">
            {letter.content}
          </p>
          <div className="text-right pr-4">
            <span className="text-rose-400 text-sm font-bold uppercase tracking-widest block mb-1">With all my love,</span>
            <span className="font-cursive text-3xl text-rose-500">{letter.sender}</span>
          </div>
        </div>
        
        {!isOpen && (
          <div className="text-rose-300 text-sm font-bold tracking-widest mt-6 animate-pulse uppercase text-center">
            Tap to read...
          </div>
        )}
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-rose-900/10 backdrop-blur-[2px] z-20" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LetterCard;
