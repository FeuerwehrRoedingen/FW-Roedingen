import admin from 'firebase-admin'
import { getMessaging, Message } from 'firebase-admin/messaging';
import { getAuth } from 'firebase-admin/auth'
import { FirebaseScrypt, FirebaseScryptOptions } from 'firebase-scrypt'

import serviceAccount from '../firebase_admin.json'
import hashConfig from '../hash_config.json'

//
// Services
// 
let app: admin.app.App;
let auth: admin.auth.Auth;
let messaging: admin.messaging.Messaging;

//
// Initialize Services and connect to firebase servers
//
export function init(){
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

//
// User Function
//

export const authenticateUser = async (email: string, password: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
  
    auth.listUsers()
      .then(res => {
        res.users.forEach(user => {
          if(user.email === email){
            
            let hash = user.passwordHash;
            let salt = user.passwordSalt;

            if(!salt || !hash){
              return resolve(false);
            }
          
            scrypt.verify(password, salt, hash)
              .then(
                resolve,
                reject
              )
              .catch(console.error);
          }
        }),
        reject
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

  return auth.createUser({uid, password, displayName, email});
}
export const deleteUser = async (uid: string) => {
  return auth.deleteUser(uid);
}
export const getUserFromToken = async (token: string) => {

}
export const createToken = async (uid: string, access_token: string, refresh_token: string) => {

}

//
// Auth Request
//
export const createAuthRequest = async (email:string, code:string) => {

}
export const getAuthRequest = async (code: string) => {

}
