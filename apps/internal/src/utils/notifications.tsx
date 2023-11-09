import React from 'react'

//----------------------------------
// Types
//----------------------------------
type INotificationContext = {
  //state

  //actions
  test: () => void;
}
type INotificationProviderProps = {
  children: React.ReactNode;
}

//----------------------------------
// Context
//----------------------------------
const initialState: INotificationContext = {
  //state

  //actions
  test: () => {}
}
const NotificationsContext = React.createContext<INotificationContext>(initialState);
export const useNotifications = () => React.useContext(NotificationsContext);

//----------------------------------
// Provider
//----------------------------------
export function NotificationProvider(props: INotificationProviderProps){

  const value: INotificationContext = {
    //state

    //actions
    test: () => {}
  }

  return (
    <NotificationsContext.Provider value={value}>
      {props.children}
    </NotificationsContext.Provider>
  )
}
