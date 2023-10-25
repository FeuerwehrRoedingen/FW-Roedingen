"use client"
import dynamic from "next/dynamic";
import { IoAddSharp, IoChevronBack, IoChevronForward } from "react-icons/io5"

import useSearchParams from "hooks/useSearchParams"
import SlidingSelector from "components/calendar/slidingSelector"

const MonthView = dynamic(() => import('components/calendar/month/calendar'), { ssr: false });
const WeekView = dynamic(() => import('components/calendar/week/calendar'), { ssr: false });
const DayView = dynamic(() => import('components/calendar/day/calendar'), { ssr: false });

export default function(){

  const [searchParams, setSearchParams] = useSearchParams({
    date: (new Date).toISOString().slice(0, 10),
    view: "month"
  });

  function handleMonthChange(month: number){
    setSearchParams(prev => {
      const newDate = new Date(prev.get('date')!);
      newDate.setMonth(date.getMonth() + month);
      prev.set('date', newDate.toISOString().slice(0, 10));
      return prev;
    });
  }
  function handleWeekChange(week: number){
    setSearchParams(prev => {
      const newDate = new Date(prev.get('date')!);
      newDate.setDate(newDate.getDate() + week * 7);
      prev.set('date', newDate.toISOString().slice(0, 10));
      return prev;
    });
  }
  function handleDayChange(day: number){
    setSearchParams(prev => {
      const newDate = new Date(prev.get('date')!);
      newDate.setDate(newDate.getDate() + day);
      prev.set('date', newDate.toISOString().slice(0, 10));
      return prev;
    });
  }
  function handleCurrent() {
    setSearchParams(prev => {
      prev.set('date', (new Date).toISOString().slice(0, 10));
      return prev;
    });
  }
  function handleSelectionChange(value: string){
    setSearchParams(prev => {
      const newValue = value === "Tag" ? "day" : value === "Woche" ? "week" : "month";
      prev.set('view', newValue);
      return prev;
    });
  }

  const date = new Date(searchParams.get("date")!);
  let view: JSX.Element;
  let handlePrevious: () => void;
  let handleNext:     () => void;

  if(searchParams.get("view") === "day"){
    view = <DayView/>
    handlePrevious= () => handleDayChange(-1);
    handleNext=     () => handleDayChange(1);
  }
  else if(searchParams.get("view") === "week"){
    view = <WeekView/>
    handlePrevious= () => handleWeekChange(-1);
    handleNext=     () => handleWeekChange(1);
  }
  else {
    view = <MonthView date={new Date(searchParams.get("date")!)} />
    handlePrevious= () => handleMonthChange(-1);
    handleNext=     () => handleMonthChange(1);
  }

  return (
    <div className="w-full h-full"> 
      <div className="w-full h-[5%] flex flex-row items-center">
        <div className="w-1/3 h-full flex items-center p-2">
          <span className="font-semibold text-2xl mr-4">
            {getMonthName(date.getMonth())}
          </span>
          <span className="text-2xl text-gray-400">
            {date.getFullYear()}
          </span>
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          <SlidingSelector options={["Tag", "Woche", "Monat"]} onChange={handleSelectionChange}/>
        </div>
        <div className="w-1/3 h-full flex flex-row items-center justify-end text-ral-3000 p-2">
          <IoChevronBack 
            onClick={handlePrevious} 
            size={25}
            className="h-8 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900 duration-300"
          />
          <a 
            onClick={handleCurrent} 
            className="mx-0.5 px-2 text-xl flex items-center h-8 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900"
          >
            Heute
          </a>
          <IoChevronForward 
            onClick={handleNext} 
            size={25}
            className="h-8 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900 duration-300"
          />
          <IoAddSharp 
            onClick={()=>{}} 
            size={25} 
            className="h-8 ml-4 cursor-pointer rounded-lg hover:bg-gray-800 active:bg-red-900 duration-300"
          />
        </div>
      </div>
      <div className="w-full h-[95%] px-2">
        {view}
      </div>
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

const getMonthName = (month: number) => {
  if(month === -1){
    return months[months.length - 1];	
  }
  return months[month];
}