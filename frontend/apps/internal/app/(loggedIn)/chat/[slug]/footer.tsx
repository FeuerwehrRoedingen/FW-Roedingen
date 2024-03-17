
import { HiOutlineEmojiHappy, HiOutlinePaperClip } from 'react-icons/hi'
import { IoIosMic } from 'react-icons/io'
import { Spacer, Textarea } from '@nextui-org/react'

type IProps = {

}
export default function Footer(props: IProps){

  return (
    <div className='w-full h-fit min-h-[64px] border-t border-gray-800 flex flex-row items-center p-2'>
      <Spacer x={5}/>
      <HiOutlineEmojiHappy size={30} className='cursor-pointer'/>
      <Spacer x={5}/>
      <HiOutlinePaperClip size={30} className='cursor-pointer'/>
      <Spacer x={5}/>
      <Textarea maxRows={5} classNames={{
        input: 'bg-transparent focus:bg-transparent active:bg-transparent',
        innerWrapper: 'bg-transparent focus:bg-transparent active:bg-transparent',
        inputWrapper: 'bg-transparent focus:bg-transparent active:bg-transparent',
      }} placeholder='Nachricht eingeben'/>
      <Spacer x={5}/>
      <IoIosMic size={30} className='cursor-pointer'/>
      <Spacer x={5}/>
    </div>
  )
}
