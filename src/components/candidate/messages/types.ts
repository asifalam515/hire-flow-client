export interface ChatData {
  id: string;
  name: string;
  avatarUrl?: string;
  color: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface MessageData {
  id: string;
  sender: 'me' | 'other';
  senderName?: string;
  type: 'text' | 'audio' | 'file';
  content?: string;
  time: string;
  file?: {
    name: string;
    size: string;
    url: string;
  };
  audio?: {
    duration: string;
    waveform: string; // just a dummy prop for now
  };
}
