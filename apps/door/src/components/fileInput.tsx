"use client"
import React from 'react'
import { Avatar } from '@nextui-org/avatar'

type IProps = {
  name?: string;
  value?: string;
  size?: number;
}
export default function(props: IProps) {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string | undefined>(props.value);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {    
    setImage(URL.createObjectURL(event.target.files![0]));
  }

  const size = props.size || 24;

  return (
    <>
      <Avatar 
        className={`w-${size} h-${size} cursor-pointer`}
        onClick={() => inputRef.current?.click()}
        src={image}
      />
      <input 
        type='file' 
        className='hidden' 
        name={props.name} 
        ref={inputRef}
        accept='image/*'
        onChange={handleImageChange}
      />
    </>
  )
}