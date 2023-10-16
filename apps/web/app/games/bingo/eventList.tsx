import React from "react"

import type { IValueType } from "./bingo"
import { eventEmitter, start, stop } from "./events"

export default function() {

  const [events, setEvents] = React.useState<IValueType[]>([]);
  const listRef = React.useRef<HTMLUListElement>(null);

  let timer: NodeJS.Timer | null = null;

  React.useEffect(() => {
    const callback = (entry: IValueType) => {
      setEvents((events) => {
        const newEvents = [...events, entry];
        return newEvents;
      });
    }
    eventEmitter.on(callback);
    
    return () => {
      eventEmitter.off(callback);
      stop();
    }
  }, []);

  React.useEffect(() => {
    if(!listRef.current){
      return;
    }
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [events]);

  const eventElements = events.map((entry, index) => {
    return (
      <li key={index} className="flex flex-row mb-2 h-fit">
        <div className="text-[20px] flex flex-row items-center justify-center mr-2 w-10">{entry.id}</div>
        <div className="flex flex-row items-center w-fit">{entry.name}</div>
      </li>
    )
  });

  return (
    <div className="w-full h-full flex-flex-col items-center px-4 py-20">
      <div className="w-full h-full border-l border-l-silver flex flex-col items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <ul className="w-full h-full overflow-scroll p-4" ref={listRef}>
          {eventElements}
        </ul>
      </div>
    </div>
  )
}