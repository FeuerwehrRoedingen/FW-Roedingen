

export default function(){

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
  const activeDay = new Date().getDay();

  const dayHeaders = days.map((day, index) => {
    return (
      <th className="w-1/7 h-fit" key={`${day}-th`}>
        <p className={`${index+1===activeDay?'text-ral-3000':'text-gray-500'} w-full h-full flex items-start justify-start pl-4 pt-4`}>
          {day}
        </p>
      </th>
    )
  });

  return (
    <tr className="w-full h-8">
      {dayHeaders}
    </tr>
  )
}
