import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'
import { App, initializeApp } from 'firebase-admin/app'
import { getMessaging, Messaging } from 'firebase-admin/messaging'

import { env } from '../env'

@Injectable()
export class FirebaseService {

  private app: App;
  private messaging: Messaging;

  constructor() {
    this.app = initializeApp({
      credential: admin.credential.cert({
        projectId:   env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey:  env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
    this.messaging = getMessaging();
  }


}
