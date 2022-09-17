import { initializeApp, FirebaseOptions }   from 'firebase/app'
import { getAnalytics }    from 'firebase/analytics'
import { getFirestore }    from 'firebase/firestore'
import { getFunctions }    from 'firebase/functions'
import { getMessaging }    from 'firebase/messaging'
import { getRemoteConfig } from 'firebase/remote-config'
import { getStorage }      from 'firebase/storage'

const tmp = process.env.FirebaseCredentials;
if(!tmp){
  process.exit(1);
}
const options: FirebaseOptions = JSON.parse(tmp);

const app       = initializeApp(options);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const functions = getFunctions(app, 'eu-west3');
const messaging = getMessaging(app);
const remote    = getRemoteConfig(app);
const storage   = getStorage(app);

export { app, analytics, firestore, functions, messaging, remote, storage }
