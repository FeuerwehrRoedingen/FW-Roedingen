"use client"

import React from "react"

type IProps = {
  classNames?: {
    container?: string;
    iframe?: string;
  };
  innerWidth: number;
  innerHeight: number;
  src: string;
}


export default function ScalableIFrame(props: IProps) {

  const [scale, setScale] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    
    const handleResize = () => {
      setScale(((containerRef.current?.offsetWidth / props.innerWidth)).toString());
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  
  return (
      <div className={`w-full h-fit aspect-video overflow-hidden p-0 ${props.classNames?.container}`} ref={containerRef}>
        <iframe
          src={props.src}
          className={`w-[${props.innerWidth}px] h-[${props.innerHeight}px] rounded-md border-none origin-top-left p-0 ${props.classNames?.iframe}`}
          style={{transform: `scale(${scale})`}}
        />
    </div>
  )
}