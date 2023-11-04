"use client"
import React from 'react'
import type { UserProfile } from '@auth0/nextjs-auth0/client'


type IUSerContext = {
  users: UserProfile[];
  addUser: (user: UserProfile) => void;
}
const context = React.createContext<IUSerContext>({ users: [], addUser: () => { } });

type IProviderProps = {
  children: React.ReactNode;
  initialUsers: UserProfile[];
}
export function Provider(props: IProviderProps) {
  const [user, _setUser] = React.useState(props.initialUsers);
  const [optimisticUsers, addOptimisticUser] = React.useOptimistic<UserProfile[], UserProfile>(user, (state, newUser) => [...state, newUser]);

  return React.createElement(context.Provider, { value: { users: optimisticUsers, addUser: addOptimisticUser } }, props.children);
}

export function useUserContext() {
  return React.useContext(context);
}
