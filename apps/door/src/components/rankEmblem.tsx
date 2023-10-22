
import React from 'react'
import { Rank, RankColor } from './ranks'

type IProps = {
  rank: Rank
}
export default function(props: IProps) {


  let border: string, background: string;

  if(props.rank.color === 'red') {
    border = 'border-ral-3001';
    background = 'bg-ral-3000';
  }
  else if(props.rank.color === 'red/silver') {
    border = 'border-silver border-dashed';
    background = 'bg-ral-3001';
  }
  else {
    border = 'border-silver';
    background = 'bg-silver';
  }

  let stripes: JSX.Element[] = [];

  for(let i = 0; i < props.rank.stripes; i++) {
    stripes.push(<Stripe color={props.rank.color} key={i} />)
  }

  return(
    <div className='bg-gray-900 w-48 h-96 py-3 px-3 flex items-center justify-center emblem'>
      <div className={`w-full h-full ${background} border-8 ${border} emblem`}>
        <div className='w-full h-full bg-gray-900 flex flex-col justify-end items-center pb-4 emblem'>
          {stripes}
        </div>
      </div>
    </div>
  )
}

type IStripeProps = {
  color: RankColor
}
function Stripe(props: IStripeProps) {

  const color = props.color === 'silver' ? 'bg-silver': 'bg-ral-3000';
  const border = props.color === 'silver' ? 'border-gray-400': 'border-ral-3001';

  return (
    <div className={`w-[5.5rem] h-5 border-4 ${color} ${border} my-1`} />
  )
}