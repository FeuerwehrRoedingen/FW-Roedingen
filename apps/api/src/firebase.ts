import admin from 'firebase-admin'
import { getMessaging, Message } from 'firebase-admin/messaging';
import { getAuth } from 'firebase-admin/auth'
import { FirebaseScrypt, FirebaseScryptOptions } from 'firebase-scrypt'

import { AuthRequest, PrismaClient } from '@prisma/client'

import serviceAccount from '../firebase_admin.json' assert { type: 'json'}
import hashConfig from '../hash_config.json'    assert { type: 'json'}

//
// Services
// 
let app: admin.app.App;
let auth: admin.auth.Auth;
let messaging: admin.messaging.Messaging;
const prisma = new PrismaClient();

//
// Initialize Services and connect to firebase servers
//
export function init() {
  app = admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(serviceAccount)
  });
  messaging = getMessaging(app);
  auth = getAuth(app);
}

//
// Consts 
//
const options: FirebaseScryptOptions = hashConfig;
const scrypt = new FirebaseScrypt(options)

//
// functions
//
export const sendMessage = (token: string, data: { [key: string]: string }) => {

  let message: Message = {
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

//
// User Function
//

export const authenticateUser = async (email: string, password: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    auth.listUsers()
      .then(res => {
        let found = false;
        res.users.forEach(user => {
          if (user.email === email) {
            found = true;

            let hash = user.passwordHash;
            let salt = user.passwordSalt;

            if (!salt || !hash) {
              return resolve(false);
            }

            scrypt.verify(password, salt, hash)
              .then(
                resolve,
                reject
              )
              .catch(reject);
          }
        });
        !found && reject('user not found');
      });
  });
}
export const createTestUser = async (
  password: string = 'test123',
  email: string = 'test@feuerwehr-roedingen.de',
  uid: string = 'test123',
  displayName: string = 'test123'
) => {

  deleteUser(uid).catch();

  return auth.createUser({ uid, password, displayName, email });
}
export const deleteUser = async (uid: string) => {
  return auth.deleteUser(uid);
}
export const getUserFromToken = async (token: string) => {
  const uid = (await prisma.token.findUnique({
    select: {
      uid: true
    },
    where: {
      access_token: token
    }
  }))?.uid;

  if (!uid) {
    return Promise.reject();
  }
  return auth.getUser(uid);
}
export const createToken = async (uid: string, access_token: string, refresh_token: string) => {
  let token = await prisma.token.findUnique({
    where: {
      uid
    }
  });
  if (token) {
    return prisma.token.update({
      where: {
        uid
      },
      data: {
        uid,
        access_token,
        access_expires: new Date(Date.now() + 600_000),   //10 minutes
        refresh_token,
        refresh_expires: new Date(Date.now() + 1_800_000) //60 minutes
      }
    });
  }
  return prisma.token.create({
    data: {
      uid,
      access_token,
      access_expires: new Date(Date.now() + 600_000),   //10 minutes
      refresh_token,
      refresh_expires: new Date(Date.now() + 1_800_000) //60 minutes
    }
  })
}

//
// Auth Request
//
export const createAuthRequest = async (email: string, code: string) => {
  const { uid } = await auth.getUserByEmail(email);

  let authrequest = await prisma.authRequest.findUnique({
    where: {
      uid
    }
  })

  if(authrequest){
    return prisma.authRequest.update({
      where: {
        uid
      },
      data: {
        uid,
        code,
        expires: new Date(Date.now() + 60_000)
      }
    })
  }
  return prisma.authRequest.create({
    data: {
      uid,
      code,
      expires: new Date(Date.now() + 60_000)
    }
  })
}
export const getAuthRequest = async (code: string) => {
  return new Promise<AuthRequest>(async (resolve, reject) => {
    let authRequest = await prisma.authRequest.findUnique({
      where: {
        code

      }
    });

    if (!authRequest) {
      reject();
      return;
    }
    resolve(authRequest)
  })
}
