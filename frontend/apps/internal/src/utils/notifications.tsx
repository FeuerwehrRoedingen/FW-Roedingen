import React from 'react'

import { getFCMToken } from './firebase'

import type { Notification } from 'types/notification'

//----------------------------------
// Types
//----------------------------------
type INotificationContext = {
  //state
  token: string | null;
  notification: Notification | null;

  //actions
  init: () => void;
  test: () => Promise<boolean>;
}
type INotificationProviderProps = {
  children: React.ReactNode;
}

//----------------------------------
// Context
//----------------------------------
const initialState: INotificationContext = {
  //state
  token: null,
  notification: null,

  //actions
  init: () => {},
  test: () => Promise.resolve(false),
}
const NotificationsContext = React.createContext<INotificationContext>(initialState);
export const useNotifications = () => React.useContext(NotificationsContext);

//----------------------------------
// Provider
//----------------------------------
export function NotificationProvider(props: INotificationProviderProps){

  // state
  const [token, setToken] = React.useState<string | null>(null);
  const [notification, setNotification] = React.useState<Notification | null>(null);

  // effects

  // actions
  async function init() {
    const token = await getFCMToken();
    setToken(token);
    //TODO register token with backend
  }

  // Provider
  const value: INotificationContext = {
    //state
    token,
    notification,

    //actions
    init,
    test: () => _test(token),
  }
  return (
    <NotificationsContext.Provider value={value}>
      {props.children}
    </NotificationsContext.Provider>
  )
}

//----------------------------------
// Functions
//----------------------------------
async function _test(token: string|null): Promise<boolean> {
  if(token === null) 
    return false;

  // TODO: implement
  return false;
}
