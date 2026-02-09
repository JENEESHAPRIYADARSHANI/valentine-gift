
import React, { useState, useRef } from 'react';
import { TabState } from '../types';

interface AddModalProps {
  type: TabState;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddModal: React.FC<AddModalProps> = ({ type, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>(
    type === 'IMAGES' 
      ? { url: '', caption: '' } 
      : { title: '', content: '', sender: '' }
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, url: reader.result as string });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) return;
    onSave({ ...formData, id: Date.now().toString() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-rose-200/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white/95 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border border-rose-100 animate-in zoom-in-95 duration-300">
        <h2 className="font-cursive text-3xl text-rose-600 mb-6 text-center">
          {type === 'IMAGES' ? 'Add a Memory 📸' : 'Write a Letter 💌'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'IMAGES' ? (
            <>
              <div>
                <label className="block text-rose-400 text-sm font-bold mb-2 ml-2">Photo</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video rounded-2xl border-2 border-dashed border-rose-200 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 transition-colors overflow-hidden relative group"
                >
                  {formData.url ? (
                    <>
                      <img src={formData.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity">
                        Change Photo
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl mb-2">📷</span>
                      <span className="text-rose-400 text-sm">Click to upload photo</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <div>
                <label className="block text-rose-400 text-sm font-bold mb-2 ml-2">Caption</label>
                <input 
                  required
                  type="text" 
                  placeholder="The moment we..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-rose-50 focus:border-rose-300 focus:outline-none transition-all"
                  value={formData.caption}
                  onChange={e => setFormData({ ...formData, caption: e.target.value })}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-rose-400 text-sm font-bold mb-2 ml-2">Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="A little note..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-rose-50 focus:border-rose-300 focus:outline-none transition-all"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-rose-400 text-sm font-bold mb-2 ml-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell your heart..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-rose-50 focus:border-rose-300 focus:outline-none transition-all resize-none"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-rose-400 text-sm font-bold mb-2 ml-2">From</label>
                <input 
                  required
                  type="text" 
                  placeholder="Forever yours..."
                  className="w-full px-5 py-3 rounded-2xl border-2 border-rose-50 focus:border-rose-300 focus:outline-none transition-all"
                  value={formData.sender}
                  onChange={e => setFormData({ ...formData, sender: e.target.value })}
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-full font-bold text-rose-400 hover:bg-rose-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isUploading || (type === 'IMAGES' && !formData.url)}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isUploading ? 'Uploading...' : 'Save ✨'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
