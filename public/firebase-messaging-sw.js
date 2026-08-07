// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
// We fetch the config from the server to avoid hardcoding API keys in public files
fetch('/api/firebase-config')
  .then((response) => response.json())
  .then((firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);
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
  })
  .catch((err) => {
    console.error('Failed to load firebase config:', err);
  });
