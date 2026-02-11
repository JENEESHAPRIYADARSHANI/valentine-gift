import React, { useState, useEffect } from "react";
import { TabState, MemoryImage, LoveLetter } from "../types";
import PolaroidCard from "./PolaroidCard";
import LetterCard from "./LetterCard";
import Lottie from "lottie-react";
import teddyAnimation from "../assets/Bear love.json";
import AddModal from "./AddModal";

interface Screen2Props {
  memories: MemoryImage[];
  letters: LoveLetter[];
  onAddMemory: (memory: MemoryImage) => void;
  onDeleteMemory: (id: string) => void;
  onAddLetter: (letter: LoveLetter) => void;
  onDeleteLetter: (id: string) => void;
  isEditMode: boolean;
}

const Screen2: React.FC<Screen2Props> = ({
  memories,
  letters,
  onAddMemory,
  onDeleteMemory,
  onAddLetter,
  onDeleteLetter,
  isEditMode,
}) => {
  const [activeTab, setActiveTab] = useState<TabState>("IMAGES");
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = (data: any) => {
    if (activeTab === "IMAGES") {
      onAddMemory(data);
    } else {
      onAddLetter(data);
    }
  };

  return (
    <div
      className={`w-full max-w-6xl transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* YAY SECTION */}
      {!isEditMode && (
        <div className="text-center mb-12 px-4">
          <h1 className="font-cursive text-3xl sm:text-6xl text-rose-600 mb-6">
            Knew that you'd say yes! 💖
          </h1>

          <div className="flex justify-center">
            <Lottie
              animationData={teddyAnimation}
              loop
              className="w-40 h-40 sm:w-56 sm:h-56"
            />
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="bg-white/60 backdrop-blur-sm p-1.5 rounded-full shadow-inner flex gap-1 border border-white/40">
          <button
            onClick={() => setActiveTab("IMAGES")}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
              activeTab === "IMAGES"
                ? "bg-rose-500 text-white shadow-md"
                : "text-rose-400 hover:bg-rose-50"
            }`}
          >
            Images 📸
          </button>
          <button
            onClick={() => setActiveTab("LETTERS")}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
              activeTab === "LETTERS"
                ? "bg-rose-500 text-white shadow-md"
                : "text-rose-400 hover:bg-rose-50"
            }`}
          >
            Letters 💌
          </button>
        </div>

        {/* ADD BUTTON (SENDER ONLY) */}
        {isEditMode && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full shadow-lg shadow-rose-200 transition-all hover:scale-105 active:scale-95 group"
          >
            <span className="text-2xl group-hover:rotate-90 transition-transform duration-300 leading-none">
              +
            </span>
            <span>Add {activeTab === "IMAGES" ? "Photo" : "Letter"}</span>
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="min-h-[500px]">
        {activeTab === "IMAGES" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-forwards"
              >
                <PolaroidCard
                  memory={memory}
                  index={index}
                  isAdmin={isEditMode}
                  onDelete={() => onDeleteMemory(memory.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 max-w-5xl mx-auto">
            {letters.map((letter, index) => (
              <div
                key={letter.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-forwards"
              >
                <LetterCard
                  letter={letter}
                  isAdmin={isEditMode}
                  onDelete={() => onDeleteLetter(letter.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <AddModal
          type={activeTab}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Screen2;
