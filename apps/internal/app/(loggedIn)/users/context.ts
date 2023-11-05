"use client"
import React from 'react'
import type { UserProfile } from '@auth0/nextjs-auth0/client'


type IUSerContext = {
  //state
  users: UserProfile[];
  selectedUser?: string;
  filter?: string;
  showModal?: boolean;

  //setState
  addUser: (user: UserProfile) => void;
  deleteUser: (user: UserProfile) => void;
  selectUser: (user: string) => void;
  setFilter: (filter: string) => void;
  setShowModal: (show: boolean) => void;
}
const context = React.createContext<IUSerContext>({
    users: [], 
    selectedUser: undefined,
    filter: undefined,
    showModal: undefined,

    addUser: () => { },
    deleteUser: () => { },
    selectUser: () => { },
    setFilter: () => { },
    setShowModal: () => { },
  });

type IProviderProps = {
  children: React.ReactNode;
  initialUsers: UserProfile[];
}
export function Provider(props: IProviderProps) {
  
  //State
  const [user, _setUser] = React.useState(props.initialUsers);
  const [selectedUser, selectUser] = React.useState<string>();
  const [filter, setFilter] = React.useState<string>();
  const [showModal, setShowModal] = React.useState<boolean>();

  //OptimisticState
  const [optimisticUsers, setOptimisticUser] = React.useOptimistic(user,reducer);
  function reducer(state: UserProfile[], action: {type: 'add'|'delete', payload: UserProfile}) {
    switch (action.type) {
      case 'add':
        return [...state, action.payload];
      case 'delete':
        return state.filter(user => user.sub !== action.payload.sub);
      default:
        throw new Error();
    }
  }

  function addUser(user: UserProfile) {
    setOptimisticUser({type: 'add', payload: user});
  }
  function deleteUser(user: UserProfile) {
    setOptimisticUser({type: 'delete', payload: user});
  }

  //initialValues
  const value: IUSerContext = {
    users: optimisticUsers,
    selectedUser,
    filter,
    showModal,

    addUser,
    deleteUser,
    selectUser,
    setFilter,
    setShowModal,
  };

  return React.createElement(context.Provider, { value }, props.children);
}

export function useUserContext() {
  return React.useContext(context);
}
