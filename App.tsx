import React, { useState, useEffect } from "react";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import { ViewState, MemoryImage, LoveLetter } from "./types";
import {
  MEMORIES as INITIAL_MEMORIES,
  LETTERS as INITIAL_LETTERS,
} from "./constants";

const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  const isViewMode = params.get("view") === "true";
  const isEditMode = !isViewMode;

  const senderFromUrl = params.get("from") || "";

  const [view, setView] = useState<ViewState>(
    isViewMode ? "PROPOSAL" : "CELEBRATION",
  );

  const [senderName, setSenderName] = useState<string>(() => {
    if (isViewMode && senderFromUrl) return senderFromUrl;

    const saved = localStorage.getItem("valentine_sender");
    return saved ? saved : "Your Secret Admirer";
  });

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

  useEffect(() => {
    localStorage.setItem("valentine_sender", senderName);
  }, [senderName]);

  const getShareableLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "true");
    url.searchParams.set("from", senderName);
    return url.toString();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(getShareableLink());
    alert("Shareable link copied 💖");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        {view === "PROPOSAL" ? (
          <Screen1
            onAccept={() => setView("CELEBRATION")}
            senderName={senderName}
            isViewMode={isViewMode}
          />
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
        Built with 💖 by <span className="underline">JEN</span>
      </footer>

      {isEditMode && (
        <div className="fixed bottom-5 left-5 bg-white p-4 rounded-2xl shadow-lg max-w-xs w-72 space-y-4">
          <p className="text-rose-600 font-bold text-sm">Edit Mode</p>

          <input
            type="text"
            placeholder="Your name..."
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-rose-200 focus:outline-none focus:border-rose-400"
          />

          <div>
            <p className="text-xs text-rose-400 mb-2">
              Share this link to send a view-only version
            </p>

            <div className="flex gap-2">
              <input
                readOnly
                value={getShareableLink()}
                className="flex-1 px-2 py-2 text-xs rounded-lg border border-rose-200 bg-rose-50 text-rose-600 truncate"
              />
              <button
                onClick={copyLink}
                className="px-3 py-2 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
