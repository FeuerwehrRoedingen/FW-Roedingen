
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
export type Rank = typeof ranks[RankKey];
export type RankName = Rank['name'];
export type RankShort = Rank['short'];
export type RankStripCount = Rank['stripes'];
export type RankColor = Rank['color'];
