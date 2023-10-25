import React from "react"
import { IoIosAddCircle } from "react-icons/io"

import CalendarList from "components/calendar/calendarList"

type IProps = {

}
export default function(props: IProps){

  return (
    <div className="w-full h-full bg-gray-900 text-silver">
      <div className="w-full h-fit px-2 py-6">
        <div className="w-full h-fit flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl">Kalender</h1>
          <IoIosAddCircle 
            size={25}
            className="cursor-pointer"
          />
        </div>
        <CalendarList />
      </div>
      <div className="w-full h-fit p-6"> 
        <h1 className="text-2xl">Mitteilungen</h1>
      </div>
    </div>
  )
}
