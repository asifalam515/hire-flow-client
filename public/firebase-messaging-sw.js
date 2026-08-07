// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDsNa_UKQB-WQHhUXdZVKLwMIAcbVUFGo4",
  authDomain: "hire-flow-ab051.firebaseapp.com",
  projectId: "hire-flow-ab051",
  storageBucket: "hire-flow-ab051.firebasestorage.app",
  messagingSenderId: "33126233328",
  appId: "1:33126233328:web:b0b7b8800e89d0c74f7e35"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/favicon.ico' // Or path to logo
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
