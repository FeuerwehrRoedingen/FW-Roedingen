import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging, getToken, onMessage as _onMessage } from 'firebase/messaging'

import type { MessagePayload, NextFn, Observer } from 'firebase/messaging'

import { API } from './api'
import firebaseConfig from './firebaseConfig.json'

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey: 'BG1ygbwqZuiqrNgyN-CYbsQZ1xCYj1huADpJtk-xq4yEBuJFRdY0sWExgmoDw8sIkO2yFHCOd2wF6pQgzjfd9aY'
})
  .then(token => {

  })
  .catch(error => {
    console.error(error)
  });

export const onMessage = (cb: NextFn<MessagePayload> | Observer<MessagePayload>) => _onMessage(messaging, cb)
