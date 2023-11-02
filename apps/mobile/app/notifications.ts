
import React from 'react'
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

type INotificationContext = {
  expoPushToken: string,
  notification?: Notifications.Notification,
  notificationListener: Notifications.Subscription,
  responseListener: Notifications.Subscription
}

const NotificationsContext = React.createContext<INotificationContext>({
  expoPushToken: '',
  notificationListener: null!,
  responseListener: null!
});

type INotificationProviderProps = {
  children: React.ReactNode
}
export function NotificationProvider(props: INotificationProviderProps) {

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState<Notifications.Notification>();
  const notificationListener = React.useRef<Notifications.Subscription>(null!);
  const responseListener = React.useRef<Notifications.Subscription>(null!);

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token!))
      .catch(err => console.log(err));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const contextValue: INotificationContext = {
    expoPushToken,
    notification,
    notificationListener: notificationListener.current,
    responseListener: responseListener.current
  }

  return React.createElement(NotificationsContext.Provider, { value: contextValue }, props.children)
}

export function useNotifications() {
  return React.useContext(NotificationsContext);
}

async function registerForPushNotificationsAsync() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas.projectId })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
