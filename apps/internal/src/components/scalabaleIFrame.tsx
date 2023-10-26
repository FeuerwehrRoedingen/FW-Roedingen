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

export function _ScalableIFrame(props: IProps) {

  const containerRef = React.useRef<HTMLDivElement>(null!);
  const scale = containerRef.current?.offsetWidth / props.innerWidth;
  const aspect = props.innerHeight / props.innerWidth;

  console.log('scale', scale);
  console.log('aspect', aspect);
  console.log('props', props);
  
  return (
    <div className={`w-full relative pt-[${aspect}%]`}>
      <div className={`w-full h-full p-0 overflow-hidden absolute top-0 left-0 ${props.classNames?.container}`} ref={containerRef}>
        <iframe
          src={props.src}
          className={`w-[${props.innerWidth}px] h-[${props.innerHeight}px] rounded-md border-none scale-[${scale}] ${props.classNames?.iframe}`}
        />
      </div>
    </div>
  )
}

export default function ScalableIFrame(props: IProps) {

  const [scale, setScale] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const aspect = (props.innerHeight / props.innerWidth)*100;

  React.useEffect(() => {
    
    const handleResize = () => setScale(((containerRef.current?.offsetWidth / props.innerWidth)).toFixed(2));
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);

  }, []);
  
  
  return (
    <div className={`w-full relative pt-[${aspect}%]`}>
      <div className={`w-full h-full p-0 overflow-hidden absolute top-0 left-0 ${props.classNames?.container}`} ref={containerRef}>
        <iframe
          src={props.src}
          className={`w-[1920px] h-[1080px] rounded-md border-none origin-top-left ${props.classNames?.iframe}`}
          style={{transform: `scale(${scale})`}}
        />
      </div>
    </div>
  )
}