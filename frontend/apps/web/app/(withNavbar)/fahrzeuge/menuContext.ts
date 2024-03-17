import React from 'react'

type IMenuContext = {
  //state
  showMenu: boolean;
  showStats: boolean;

  //actions
  setShowMenu: (showMenu: boolean) => void;
  setShowStats: (showStats: boolean) => void;
}
type IMenuProviderProps = {
  children: React.ReactNode;
}

export const menuContext = React.createContext<IMenuContext>({
  showMenu: false,
  showStats: false,
  setShowMenu: () => {},
  setShowStats: () => {},
});

export const useMenu = () => React.useContext(menuContext);
export function MenuProvider(props: IMenuProviderProps) {

  const [showMenu, setShowMenu] = React.useState(true);
  const [showStats, setShowStats] = React.useState(false);

  const value: IMenuContext = {
    showMenu,
    showStats,
    setShowMenu,
    setShowStats,
  }

  return React.createElement(menuContext.Provider, {value: value}, props.children)
}
