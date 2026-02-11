import React, { useState } from "react";
import confetti from "canvas-confetti";

interface Screen1Props {
  onAccept: () => void;
  senderName: string;
  isViewMode: boolean;
}

const Screen1: React.FC<Screen1Props> = ({
  onAccept,
  senderName,
  isViewMode,
}) => {
  const [attempts, setAttempts] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    const maxX = Math.max(0, window.innerWidth - 160);
    const maxY = Math.max(0, window.innerHeight - 80);

    setAttempts((a) => a + 1);
    setPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  const handleYes = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setTimeout(onAccept, 700);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/40 transition-all">
        {/* Sender message */}
        {isViewMode && (
          <p className="text-rose-500 mb-6 text-base sm:text-lg animate-fade-in">
            💌 You got this invitation from{" "}
            <span className="font-bold text-rose-600">{senderName}</span>
          </p>
        )}

        <h1 className="font-cursive text-3xl sm:text-5xl text-rose-600 mb-10 leading-relaxed">
          Will you be my Valentine? 💖
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleYes}
            className="w-full sm:w-auto px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Yes 💕
          </button>

          <button
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            style={{
              position: attempts > 0 ? "fixed" : "static",
              left: pos.x,
              top: pos.y,
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition-all"
          >
            {attempts > 4 ? "Are you sure? 🥺" : "No 🙃"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screen1;
