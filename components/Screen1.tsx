
import React, { useState, useRef, useEffect } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

interface Screen1Props {
  onAccept: () => void;
}

const Screen1: React.FC<Screen1Props> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const padding = 20;
    const maxX = window.innerWidth - 150 - padding;
    const maxY = window.innerHeight - 50 - padding;
    
    // Pick random coordinates within viewport
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
    setAttempts(prev => prev + 1);
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#da70d6']
    });
    
    // Add a slight delay before transitioning for the confetti feel
    setTimeout(onAccept, 800);
  };

  const noButtonText = attempts > 5 ? "Are you sure? 🥺" : "No 🙃";

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/50 text-center max-w-md w-full animate-float">
        <div className="mb-6 text-6xl">💖</div>
        <h1 className="font-cursive text-4xl md:text-5xl text-rose-600 mb-10 leading-relaxed">
          Will you be my Valentine?
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleYesClick}
            className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 text-xl"
          >
            Yes 💕
          </button>
          
          <button
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            style={isMoved ? {
              position: 'fixed',
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              zIndex: 50,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            } : {}}
            className="px-10 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full shadow-md text-xl whitespace-nowrap"
          >
            {noButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screen1;
