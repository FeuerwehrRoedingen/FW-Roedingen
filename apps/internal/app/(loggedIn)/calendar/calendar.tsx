"use client"
import { useState } from "react"
import { IoAddSharp, IoChevronBack, IoChevronForward } from "react-icons/io5"

import CalendarEntry from "./calendarEntry"
import CalendarHead from "./calendarHead"
import { addCalendar, addEvent, getCalendars, getEvents } from "@/src/utils/calendar"

type IProps = {
  
}
export default function(props: IProps){

  const today = new Date();
  const [thisMonth, setThisMonth] = useState(today);
  const next = () => {
    setThisMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }
  const current = () => {
    setThisMonth(today);
  }
  const previous = () => {
    setThisMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  const entires = generateWeeks(thisMonth).map((week) => {
    const days = week.map((day) => {
      return <CalendarEntry date={day} currentMonth={thisMonth}/>
    });
    return (
      <tr>
        {days}
      </tr>
    )
  });

  return (
    <div className="w-full h-full px-2">
      <div className="w-full h-fit flex flex-row">
        <div className="w-1/3 h-full flex items-center p-2">
          <span className="font-semibold text-2xl mr-4">
            {months[thisMonth.getMonth()-1]}
          </span>
          <span className="text-2xl text-gray-400">
            {thisMonth.getFullYear()}
          </span>
        </div>
        <div className="w-1/3 h-full">
        </div>
        <div className="w-1/3 h-full flex flex-row items-center justify-end text-ral-3000 p-2">
          <IoChevronBack 
            onClick={previous} 
            size={25}
            className="h-8 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900 duration-300"
          />
          <a 
            onClick={current} 
            className="mx-0.5 px-2 text-xl flex items-center h-8 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900"
          >
            Heute
          </a>
          <IoChevronForward 
            onClick={next} 
            size={25}
            className="h-8 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900 duration-300"
          />
          <IoAddSharp 
            onclick={()=>{}} 
            size={25} 
            className="h-8 ml-4 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900 duration-300"
          />
        </div>
      </div>
      <table className="w-full h-[95%] table-fixed">
        <thead className="w-full h-4 min-h-0">
          <CalendarHead activeDay={today.getDay()}/>
        </thead>
        <tbody className="w-full h-[90%]">
          {entires}
        </tbody>
      </table>
    </div>
  )
}

const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
]

function generateWeeks(thisMonth: Date) {
  const month = thisMonth.getMonth();
  const year = thisMonth.getFullYear();
  const daysInMonth = new Date(thisMonth.getFullYear(), month + 1, 0).getDate();
  const firstDayInMonth = new Date(thisMonth.getFullYear(), month, 1).getDay();
  const days: Date[] = [];

  const neededBefore = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;
  const neededAfter = (42 - daysInMonth - neededBefore) % 7;

  for(let i=1; i <= neededBefore ; i++){
    days.push(new Date(thisMonth.getFullYear(), month, i - neededBefore));
  }

  for(let i = 1; i <= daysInMonth; i++){
    days.push(new Date(thisMonth.getFullYear(), month, i));
  }

  for(let i=1; i <= neededAfter; i++){
    days.push(new Date(thisMonth.getFullYear(), month + 1, i));
  }

  const weeks: Date[][] = [[]];

  for(let i = 0; i < days.length; i++){
    if(i % 7 === 0){
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(days[i]);
  }

  return weeks;
}