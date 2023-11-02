import 'expo-dev-client';
import * as Sentry from '@sentry/react-native';
import { Auth0Provider } from 'react-native-auth0';

import Main from './app/main';
import { NotificationProvider } from './app/notifications';

Sentry.init({
  dsn: 'https://f275e8025642f5eed97674104d4a505f@o4505608718385152.ingest.sentry.io/4506144673431552',
});

export default function App() {
  return (
    <Auth0Provider domain={"fw-roedingen.eu.auth0.com"} clientId={"qniPatj7AbyoPqhetOvGCtawgcExPhq4"}>
      <NotificationProvider >
        <Main />
      </NotificationProvider>
    </Auth0Provider>
  );
}
