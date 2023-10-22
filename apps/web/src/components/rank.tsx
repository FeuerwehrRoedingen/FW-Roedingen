import React from "react"

export const ranks = {
  FeuerwehrmannAnwärter: {
    name: 'FeuerwehrmannAnwärter',
    short: 'FMA',
    stripes: 0,
    color: 'red'
  },
  Feuerwehrmann: {
    name: 'Feuerwehrmann',
    short: 'FM',
    stripes: 1,
    color: 'red'
  },
  Oberfeuerwehrmann:{
    name: 'Oberfeuerwehrmann',
    short: 'OFM',
    stripes: 2,
    color: 'red'
  },
  Hauptfeuerwehrmann:{
    name: 'Hauptfeuerwehrmann',
    short: 'HFM',
    stripes: 3,
    color: 'red'
  },
  Unterbrandmeister:{
    name: 'Unterbrandmeister',
    short: 'UBM',
    stripes: 4,
    color: 'red'
  },
  Brandmeister:{
    name: 'Brandmeister',
    short: 'BM',
    stripes: 1,
    color: 'red/silver'
  },
  Oberbrandmeister:{
    name: 'Oberbrandmeister',
    short: 'OBM',
    stripes: 2,
    color: 'red/silver'
  },
  Hauptbrandmeister:{
    name: 'Hauptbrandmeister',
    short: 'HBM',
    stripes: 3,
    color: 'red/silver'
  },
  Brandinspektor:{
    name: 'Brandinspektor',
    short: 'BI',
    stripes: 1,
    color: 'silver'
  },
  Brandoberinspektor:{
    name: 'Brandoberinspektor',
    short: 'BOI',
    stripes: 2,
    color: 'silver'
  },
  Gemeindebrandinspektor:{
    name: 'Gemeindebrandinspektor',
    short: 'GBI',
    stripes: 3,
    color: 'silver'
  }
 } as const;

export type RankKey = keyof typeof ranks;
export type RankType = typeof ranks[RankKey];
export type RankName = RankType['name'];
export type RankShort = RankType['short'];
export type RankColor = RankType['color'];
export type RankStripesCount = RankType['stripes'];

type RankstripeProps = {
  color: RankColor;
}
function Rankstripe(props: RankstripeProps) {
  if (props.color === 'red' || props.color === 'red/silver') {
    return (
      <div className="w-14 h-3 bg-ral-3000 border-3 border-ral-3001 my-1" />
    )
  } else {
    return (
      <div className="w-14 h-3 bg-silver border-2 border-gray-500 my-1" />
    )
  }
}

type RankStripesProps = {
  rank: RankType;
  className?: string;
}
export function RankStripes(props: RankStripesProps) {

  let stripes: JSX.Element[] = [];

  for (let i = 0; i < props.rank.stripes; i++) {
    stripes.push(<Rankstripe color={props.rank.color} key={`stripe-${i}`}/>)
  }

  let color;

  if (props.rank.color === 'red') {
    color = 'bg-ral-3001 border-ral-3001'
  }
  else if (props.rank.color === 'red/silver') {
    color = 'bg-ral-3001 border-silver border-dashed'
  }
  else {
    color = 'bg-silver border-silver'
  }

  return (
    <div 
      className={`${color} border-3 p-0.5 rounded-lg min-w-[78px] min-h-[34px] ${props.className}`}
    >
      <div className="bg-gray-900 px-2 py-1 rounded-md m-[-2px] min-h-[28px]">
        {stripes}
      </div>
    </div>
  )
}
