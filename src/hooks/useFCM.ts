import { useEffect, useRef } from 'react';
import { messaging, getToken, onMessage } from '../lib/firebase';
import { apiClient } from '../lib/api';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

// You must generate a Web Push Certificate (Key Pair) in the Firebase Console:
// Project Settings -> Cloud Messaging -> Web configuration -> Generate Key Pair
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "REPLACE_WITH_YOUR_VAPID_KEY";

export function useFCM() {
  const { user } = useAuthStore();
  const tokenSentRef = useRef(false);

  useEffect(() => {
    // Only run on the client side and if a user is logged in
    if (typeof window === 'undefined' || !user || tokenSentRef.current) return;

    const requestPermissionAndGetToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const msg = await messaging();
          if (msg) {
            const currentToken = await getToken(msg, { vapidKey: VAPID_KEY });
            if (currentToken) {
              console.log('Got FCM token:', currentToken);
              // Send the token to your server and update the UI if necessary
              await apiClient.post('/users/me/fcm-token', { token: currentToken });
              tokenSentRef.current = true;
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }
        } else {
          console.log('Notification permission denied by user.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving FCM token:', error);
      }
    };

    requestPermissionAndGetToken();

    const setupForegroundListener = async () => {
      const msg = await messaging();
      if (msg) {
        onMessage(msg, (payload) => {
          console.log('Message received in foreground:', payload);
          if (payload.notification?.title && payload.notification?.body) {
            toast(payload.notification.title + '\n' + payload.notification.body, {
              icon: '💬',
              duration: 5000,
            });
          }
        });
      }
    };

    setupForegroundListener();

  }, [user]);
}
