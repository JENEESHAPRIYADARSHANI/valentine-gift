
import { MemoryImage, LoveLetter } from './types';

export const MEMORIES: MemoryImage[] = [
  { id: '1', url: 'https://picsum.photos/seed/valentine1/400/500', caption: 'That beautiful sunset walk' },
  { id: '2', url: 'https://picsum.photos/seed/valentine2/400/500', caption: 'When we first met' },
  { id: '3', url: 'https://picsum.photos/seed/valentine3/400/500', caption: 'Cozy coffee dates' },
  { id: '4', url: 'https://picsum.photos/seed/valentine4/400/500', caption: 'Our favorite trip together' },
  { id: '5', url: 'https://picsum.photos/seed/valentine5/400/500', caption: 'Late night conversations' },
  { id: '6', url: 'https://picsum.photos/seed/valentine6/400/500', caption: 'Smiling for no reason' },
];

export const LETTERS: LoveLetter[] = [
  {
    id: 'l1',
    title: 'A Little Note',
    content: "I just wanted to say how much you mean to me. Every day feels brighter just knowing you are in my life. You make even the simplest moments feel like magic.",
    sender: 'Forever Yours'
  },
  {
    id: 'l2',
    title: 'Thinking of You',
    content: "My heart skips a beat every time I see your smile. Thank you for being the kind, beautiful soul that you are. I cherish every memory we create together.",
    sender: 'With Love'
  },
  {
    id: 'l3',
    title: 'To My Favorite Person',
    content: "There's no one else I'd rather share my adventures with. You're my best friend, my confidante, and my favorite person to laugh with.",
    sender: 'Always'
  },
  {
    id: 'l4',
    title: 'Future Dreams',
    content: "I look forward to many more Valentine's Days with you. Let's keep exploring, growing, and loving more each day.",
    sender: 'XOXO'
  }
];
