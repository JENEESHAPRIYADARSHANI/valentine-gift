import React, { useState } from "react";
import confetti from "canvas-confetti";

interface Screen1Props {
  onAccept: () => void;
}

const Screen1: React.FC<Screen1Props> = ({ onAccept }) => {
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
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <div className="bg-white/80 p-10 rounded-3xl shadow-xl text-center max-w-md">
        <h1 className="font-cursive text-5xl text-rose-600 mb-8">
          Will you be my Valentine? 💖
        </h1>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleYes}
            className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold"
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
            className="px-8 py-4 bg-gray-100 rounded-full font-bold"
          >
            {attempts > 4 ? "Are you sure? 🥺" : "No 🙃"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Screen1;