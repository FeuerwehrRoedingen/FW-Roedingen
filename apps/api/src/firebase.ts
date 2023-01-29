import { initializeApp } from 'firebase-admin'
import { getMessaging, Message } from 'firebase-admin/messaging';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fw-roedingen.firebaseapp.com",
  projectId: "fw-roedingen",
  storageBucket: "fw-roedingen.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const sendMessage = (message: Message) => messaging.send(message)
