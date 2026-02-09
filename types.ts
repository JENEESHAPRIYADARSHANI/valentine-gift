
export interface MemoryImage {
  id: string;
  url: string;
  caption: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  content: string;
  sender: string;
}

export type ViewState = 'PROPOSAL' | 'CELEBRATION';
export type TabState = 'IMAGES' | 'LETTERS';
