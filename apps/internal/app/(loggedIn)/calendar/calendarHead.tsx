
type IProps = {
  activeDay: number;
}
export default function(props: IProps){

  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]

  const dayHeaders = days.map((day, index) => {
    return (
      <th className="w-1/7 h-fit">
        <p className={`${index+1===props.activeDay?'text-ral-3000':'text-gray-500'} w-full h-full flex items-start justify-start pl-4 pt-4`}>
          {day}
        </p>
      </th>
    )
  });

  return (
    <tr className="w-full h-10">
      {dayHeaders}
    </tr>
  )
}