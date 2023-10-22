"use client"
import React from 'react'
import { Avatar } from '@nextui-org/avatar'

type IProps = {
  name?: string;
}
export default function(props: IProps) {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState<string | undefined>(undefined);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    
    console.log(event.target.files![0]);
    
    setImage(URL.createObjectURL(event.target.files![0]));
  }

  return (
    <>
      <Avatar 
        className='w-24 h-24 cursor-pointer'
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