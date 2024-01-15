import React from 'react'
import { Tooltip } from '@nextui-org/react';

type IProps = {
  dienstgrad: string;
  funktion: string
  name: string;
  tooltip: string;
}
export default function(props: IProps){

  return (
    <tr className='w-fit my-4 dark'>
      <td>
        <Tooltip showArrow content={props.tooltip} placement='right'>
          <p className='w-fit pl-4 text-ral-1026 cursor-pointer'>
            {props.dienstgrad}
          </p>
        </Tooltip>
      </td>
      <td className='w-fit whitespace-nowrap px-1'>
        {props.name}
      </td>
      <td className='w-fit whitespace-nowrap'>
        {props.funktion}
      </td>
    </tr>
  )
}
