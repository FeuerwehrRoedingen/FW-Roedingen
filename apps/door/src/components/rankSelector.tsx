"use client"
import React from 'react'
import { RadioGroup, Radio } from '@nextui-org/radio'

import { Rank, RankKey, ranks } from './ranks'
import RankEmblem from './rankEmblem';

export default function() {

  const [selectedRank, setSelectedRank] = React.useState<Rank>(ranks.FeuerwehrmannAnwärter);

  const selector = Object.values(ranks).reverse().map(rank => {
    return (
      <Radio value={rank.name} key={rank.short}>
        {rank.name.split('A').join(' A')}
      </Radio>
    )
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRank(ranks[e.target.value as RankKey]);
  }

  return (
    <div className='w-full h-full flex flex-row items-center'>
      <div className='w-1/2 h-fit flex items-center justify-center'>
        <RankEmblem rank={selectedRank}/>
      </div>
      <div className='w-1/2 h-fit'>
        <RadioGroup 
          name='rank'
          value={selectedRank.name}
          onChange={handleChange}
        >
          {selector}
        </RadioGroup>
      </div>
    </div>
  )
}
