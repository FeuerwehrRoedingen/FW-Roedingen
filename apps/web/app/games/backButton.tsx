"use client"
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { IoIosArrowBack } from 'react-icons/io'

type IProps = {
  className: string;
}
export default function(props: IProps) {

  const { back } = useRouter();

  return (
    <Button 
      onClick={() => back()}
      variant='ghost'
      startContent={<IoIosArrowBack size={20}/>}
      color='warning'
      className={props.className}
    >
      Back
    </Button>
  )
}