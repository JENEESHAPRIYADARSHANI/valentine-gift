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

  const isViewMode =
    new URLSearchParams(window.location.search).get("view") === "true";

  const isEditMode = !isViewMode;

  const [memories, setMemories] = useState<MemoryImage[]>(() => {
    const saved = localStorage.getItem("valentine_memories");
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  const [letters, setLetters] = useState<LoveLetter[]>(() => {
    const saved = localStorage.getItem("valentine_letters");
    return saved ? JSON.parse(saved) : INITIAL_LETTERS;
  });

  useEffect(() => {
    localStorage.setItem("valentine_memories", JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem("valentine_letters", JSON.stringify(letters));
  }, [letters]);

  //shareable link
  const getShareableLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "true");
    return url.toString();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(getShareableLink());
    alert("Shareable link copied ");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        {view === "PROPOSAL" ? (
          <Screen1 onAccept={() => setView("CELEBRATION")} />
        ) : (
          <Screen2
            memories={memories}
            letters={letters}
            onAddMemory={(m) => setMemories([m, ...memories])}
            onDeleteMemory={(id) =>
              setMemories(memories.filter((m) => m.id !== id))
            }
            onAddLetter={(l) => setLetters([l, ...letters])}
            onDeleteLetter={(id) =>
              setLetters(letters.filter((l) => l.id !== id))
            }
            isEditMode={isEditMode}
          />
        )}
      </main>

      <footer className="py-4 text-center text-rose-300 text-sm">
        Built with 💖 by <a className="underline">JEN</a>
      </footer>

      {isEditMode && (
        <div className="fixed bottom-5 left-5 bg-white p-4 rounded-2xl shadow-lg max-w-xs">
          <p className="text-rose-600 font-bold text-sm mb-1">
            ✨ Edit Mode (Default)
          </p>
          <p className="text-xs text-rose-400 mb-3">
            Share this link to send a view-only version
          </p>

          <div className="flex gap-2">
            <input
              readOnly
              value={getShareableLink()}
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-rose-200 bg-rose-50 text-rose-600 truncate"
            />
            <button
              onClick={copyLink}
              className="px-3 py-2 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
