import React from "react";

type IProps ={
  fullscreen?: boolean;
  classNames?: {screen: string, icon: string};
}

export const LoadingIcon = ({fullscreen, classNames}: IProps) => {

  let screenClass = `${fullscreen ? 'h-full w-full flex items-center justify-center': ''} ${classNames?.screen || ''}`;
  let iconClass = `lds-ring ${classNames?.icon || ''}`;

  return (
    <div className={screenClass}>
      <div className={iconClass}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}