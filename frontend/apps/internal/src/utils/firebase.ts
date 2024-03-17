import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

import { env } from 'env'

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fw-roedingen.firebaseapp.com",
  projectId: "fw-roedingen",
  storageBucket: "fw-roedingen.appspot.com",
  messagingSenderId: "639345913732",
  appId: "1:639345913732:web:ebb94f3a6a1cd320f237d1",
  measurementId: "G-VMFT884T5E"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export function getFCMToken(){
  return getToken(messaging,{
    vapidKey: env.NEXT_PUBLIC_VAPID_KEY
  })
}
