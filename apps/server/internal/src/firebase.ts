import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging, getToken, onMessage as _onMessage } from 'firebase/messaging'

import type { MessagePayload, Messaging, NextFn, Observer } from 'firebase/messaging'

import { API } from '../../../../shared/api'
import firebaseConfig from './firebaseConfig.json'

const app = initializeApp(firebaseConfig);

//export const analytics = getAnalytics(app);
let messaging: Messaging;

export function initMessaging(userID: string) {
  return new Promise<void>(async (resolve, reject) => {
    if(messaging !== undefined){
      return resolve();
    }

    messaging = getMessaging(app);

    getToken(messaging, {
      vapidKey: 'BG1ygbwqZuiqrNgyN-CYbsQZ1xCYj1huADpJtk-xq4yEBuJFRdY0sWExgmoDw8sIkO2yFHCOd2wF6pQgzjfd9aY'
    })
      .then(token => {
        fetch(API + '/users/messageToken', {
          method: 'POST',
          body: JSON.stringify({ token, userID }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            response.json().then(resolve, reject);
          }, reject);
      })
      .catch(reject);
  });
}

export const onMessage = (cb: NextFn<MessagePayload> | Observer<MessagePayload>) => _onMessage(messaging, cb)
