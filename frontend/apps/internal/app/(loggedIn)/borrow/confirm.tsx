
import React from 'react';
import { Input } from '@nextui-org/react';
import SubmitButton from './submitButton';

type IProps = {

}
export default function (props: IProps) {

  return (
    <div className='w-full h-full flex flex-row items-center justify-center gap-3 bg-gray-900 pr-3'>
      <Input
        label='Von'
        type='date'
        labelPlacement='inside'
        placeholder=' '
        isRequired
        className='max-w-xs'
      />
      <Input
        label='Bis'
        type='date'
        labelPlacement='inside'
        placeholder=' '
        isRequired
        className='max-w-xs'
      />
      <Input
        label='Für'
        type='text'
        labelPlacement='inside'
        isRequired
        className='max-w-xs'
      />
      <SubmitButton />
    </div>
  )
}
