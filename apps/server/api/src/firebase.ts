import admin from 'firebase-admin'
import { getMessaging, Message } from 'firebase-admin/messaging';

import serviceAccount from '../firebase_admin.json' assert { type: "json"}

const app = admin.initializeApp({
  //@ts-ignore
  credential: admin.credential.cert(serviceAccount)
});
const messaging = getMessaging(app);

export const sendMessage = (token: string, data: {[key: string]: string}) => {

  let message:Message = {
    token,
    data,
    notification: {
      body: 'body',
      title: 'title',
      imageUrl: 'http://localhost:3000/img/logo.png'
    }
  }

  return messaging.send(message);
}
