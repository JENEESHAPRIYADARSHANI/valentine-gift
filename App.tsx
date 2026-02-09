import React, { useState, useEffect } from "react";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import { ViewState, MemoryImage, LoveLetter } from "./types";
import {
  MEMORIES as INITIAL_MEMORIES,
  LETTERS as INITIAL_LETTERS,
} from "./constants";

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>("PROPOSAL");

  // Mode detection: ?mode=edit enables editing/deleting features
  const isEditMode =
    new URLSearchParams(window.location.search).get("mode") === "edit";

  // Load from local storage or defaults
  const [memories, setMemories] = useState<MemoryImage[]>(() => {
    const saved = localStorage.getItem("valentine_memories");
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  const [letters, setLetters] = useState<LoveLetter[]>(() => {
    const saved = localStorage.getItem("valentine_letters");
    return saved ? JSON.parse(saved) : INITIAL_LETTERS;
  });

  // Sync with local storage
  useEffect(() => {
    localStorage.setItem("valentine_memories", JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem("valentine_letters", JSON.stringify(letters));
  }, [letters]);

  const handleYes = () => {
    setView("CELEBRATION");
  };

  const addMemory = (newMemory: MemoryImage) => {
    setMemories([newMemory, ...memories]);
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  const addLetter = (newLetter: LoveLetter) => {
    setLetters([newLetter, ...letters]);
  };

  const deleteLetter = (id: string) => {
    setLetters(letters.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full">
        {view === "PROPOSAL" ? (
          <Screen1 onAccept={handleYes} />
        ) : (
          <Screen2
            memories={memories}
            letters={letters}
            onAddMemory={addMemory}
            onDeleteMemory={deleteMemory}
            onAddLetter={addLetter}
            onDeleteLetter={deleteLetter}
            isEditMode={isEditMode}
          />
        )}
      </main>

      {/* Branding Footer */}
      <footer className="w-full py-6 text-center text-rose-300 text-sm font-medium">
        Built with 💖 by{" "}
        <a href="#" className="hover:text-rose-500 underline transition-colors">
          Your Name
        </a>
      </footer>

      {/* Edit Mode Helper */}
      {isEditMode && (
        <div className="fixed bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-rose-100 z-50 animate-bounce">
          <p className="font-bold text-rose-600 text-sm mb-1">
            ✨ Creator Mode Active
          </p>
          <p className="text-rose-400 text-xs">
            Share this URL without <b>?mode=edit</b> to your Valentine!
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
