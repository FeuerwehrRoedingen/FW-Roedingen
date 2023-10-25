"use client"
import CalendarEntry from "./calendarEntry"
import CalendarHead from "./calendarHead"

type IProps = {
  date: Date
}
export default function (props: IProps) {

  const month = props.date.getMonth();
  const year = props.date.getFullYear();

  const entires = generateWeeks(month, year).map((week) => {
    const days = week.map((day) => {
      return <CalendarEntry date={day} currentMonth={month} currentYear={year} key={`${month}-${day}`}/>
    });
    return (
      <tr key={`${week}-tr`}>
        {days}
      </tr>
    )
  });

  return (
    <table className="w-full h-full table-fixed">
      <thead className="w-full h-4 min-h-0">
        <CalendarHead />
      </thead>
      <tbody className="w-full h-[90%]">
        {entires}
      </tbody>
    </table>
  )
}

function generateWeeks(month: number, year: number) {

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayInMonth = new Date(year, month, 1).getDay();
  const days: Date[] = [];

  const neededBefore = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;
  const neededAfter = (42 - daysInMonth - neededBefore) % 7;

  for (let i = 1; i <= neededBefore; i++) {
    days.push(new Date(year, month, i - neededBefore));
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  for (let i = 1; i <= neededAfter; i++) {
    days.push(new Date(year, month + 1, i));
  }

  const weeks: Date[][] = [];

  for (let i = 0; i < days.length; i++) {
    if (i % 7 === 0) {
      weeks.push([]);
    }
    weeks[weeks.length - 1].push(days[i]);
  }

  return weeks;
}
