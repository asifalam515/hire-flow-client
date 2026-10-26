import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/useAuthStore';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8050';

export function useSocket(namespace?: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      setSocket((prev) => {
        if (prev) prev.disconnect();
        return null;
      });
      setIsConnected(false);
      return;
    }

    const url = namespace ? `${SOCKET_URL}/${namespace.replace(/^\//, '')}` : SOCKET_URL;
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const socketInstance = io(url, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      autoConnect: true,
      auth: { token },
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [user, namespace]);

  return {
    socket,
    isConnected,
  };
}

