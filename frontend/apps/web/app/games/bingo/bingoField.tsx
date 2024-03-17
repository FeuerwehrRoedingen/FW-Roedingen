"use client"
import React from "react"

import { Matrix } from "./bingo";

type IProps = {
  initialEntries: Matrix;
}

export default function (props: IProps) {
  const [entries, setEntries] = React.useState<Matrix>(props.initialEntries);
  const [bingo, setBingo] = React.useState<boolean>(false);
  const [currentItem, setCurrentItem] = React.useState<number>(-1);
  const [madeBingoWith, setMadeBingoWith] = React.useState<number>(-1);

  const handleClick = (index: number) => {
    setCurrentItem(index);
    setEntries(oldEntris => {
      return oldEntris.map((entry, entryIndex) => {
        if(entryIndex === index){
          return {
            ...entry,
            marked: !entry.marked
          }
        }
        return entry;
      });
    });
  }

  React.useEffect(() => {
    if(checkForBingo(entries) && !bingo){
      setMadeBingoWith(currentItem);
      setBingo(true);
      alert("Bingo!");
    }
    if(bingo && madeBingoWith === currentItem){
      setBingo(false);
      alert("Ach ne doch nicht...");
    }
  }, [entries]);

  let entriesAs2DArray: Matrix[] = [
    entries.slice(0,5),
    entries.slice(5,10),
    entries.slice(10,15),
    entries.slice(15,20),
    entries.slice(20,25),
  ];

  const entryElements = entriesAs2DArray.map((row, rowIndex) => {
    const rowElements = row.map((entry, entryIndex) => {
      const index = rowIndex * 5 + entryIndex;

      let component: number | JSX.Element;

      if(entry.marked){
        component = (
          <div key={index} className="rounded-full bg-red-500 w-[80%] h-[80%]"/>
        )
      } else {
        component = entry.value.id;
      }

      return (
        <div key={index} className="w-20 h-20 flex items-center justify-center cursor-pointer text-2xl" onClick={() => handleClick(index)}>
          {component}
        </div>
      )
    });
    return (
      <div key={rowIndex} className="flex flex-row">
        {rowElements}
      </div>
    )
  });
  return (
    <div className='bg-gray-900 rounded-3xl'>
      {entryElements}
    </div>
  )
}

function checkForBingo(entries: Matrix): boolean {
  const rows = [
    entries.slice(0,5),
    entries.slice(5,10),
    entries.slice(10,15),
    entries.slice(15,20),
    entries.slice(20,25),
  ];

  const columns = [
    [entries[0], entries[5], entries[10], entries[15], entries[20]],
    [entries[1], entries[6], entries[11], entries[16], entries[21]],
    [entries[2], entries[7], entries[12], entries[17], entries[22]],
    [entries[3], entries[8], entries[13], entries[18], entries[23]],
    [entries[4], entries[9], entries[14], entries[19], entries[24]],
  ];

  const diagonals = [
    [entries[0], entries[6], entries[12], entries[18], entries[24]],
    [entries[4], entries[8], entries[12], entries[16], entries[20]],
  ];

  const all = [...rows, ...columns, ...diagonals];

  const bingo = all.some(row => row.every(entry => entry.marked));

  return bingo;
}
