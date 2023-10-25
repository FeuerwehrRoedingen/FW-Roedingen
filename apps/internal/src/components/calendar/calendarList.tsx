"use client"
import React from "react"

import { useAppDispatch, useAppSelector } from "store"
import { fetchCalendars, setSelected } from "store/reducer/calendar.slice"
import CalendarListItem from "./calendarListItem"

type IProps = {
  
}
export default function (props: IProps) {
  const [selectedCal, setSelectedCal] = React.useState(0);
  const { calendars, selectedCalendars} = useAppSelector(state => state.calendar);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchCalendars());
  }, []);

  const calendarItems = calendars.map((calendar, id) => {
    return (
      <CalendarListItem 
        key={`${calendar.name}-li`}
        label={calendar.name}
        onClick={() => {
          setSelectedCal(id);
        }}
        isActive={selectedCal === id}
        isChecked={selectedCalendars.includes(calendar.name)}
        onValueChange={() => {
          dispatch(setSelected(calendar.name));
        }}
      />
    )
  });

  return (
    <ul>
      {calendarItems}
    </ul>
  )
}
