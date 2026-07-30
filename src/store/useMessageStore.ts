import { create } from 'zustand';
import { ChatData, MessageData } from '@/components/candidate/messages/types';

interface MessageState {
  conversations: ChatData[];
  messages: Record<string, MessageData[]>;
  activeConversationId: string | null;
  isLoading: boolean;
  
  setConversations: (conversations: ChatData[]) => void;
  setMessages: (conversationId: string, messages: MessageData[]) => void;
  addMessage: (conversationId: string, message: MessageData) => void;
  setActiveConversationId: (id: string | null) => void;
  updateUnreadCount: (conversationId: string, count: number) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  conversations: [],
  messages: {},
  activeConversationId: null,
  isLoading: false,

  setConversations: (conversations) => set({ conversations }),
  
  setMessages: (conversationId, messages) => set((state) => ({
    messages: {
      ...state.messages,
      [conversationId]: messages
    }
  })),

  addMessage: (conversationId, message) => set((state) => {
    const existingMessages = state.messages[conversationId] || [];
    // Prevent duplicate messages if already present
    if (existingMessages.some(m => m.id === message.id)) {
      return state;
    }
    
    return {
      messages: {
        ...state.messages,
        [conversationId]: [...existingMessages, message]
      }
    };
  }),

  setActiveConversationId: (id) => set({ activeConversationId: id }),

  updateUnreadCount: (conversationId, count) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: count } : conv
    )
  })),

  setIsLoading: (isLoading) => set({ isLoading }),
}));
