import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDsNa_UKQB-WQHhUXdZVKLwMIAcbVUFGo4",
  authDomain: "hire-flow-ab051.firebaseapp.com",
  projectId: "hire-flow-ab051",
  storageBucket: "hire-flow-ab051.firebasestorage.app",
  messagingSenderId: "33126233328",
  appId: "1:33126233328:web:b0b7b8800e89d0c74f7e35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Messaging and get a reference to the service
// We only initialize messaging if it's supported by the browser to avoid crashes
export const messaging = async () => {
  const supported = await isSupported();
  if (supported) {
    return getMessaging(app);
  }
  return null;
};

export { app, getToken, onMessage };
