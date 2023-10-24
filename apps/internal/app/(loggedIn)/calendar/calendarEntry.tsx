import React from "react";

type IProps = {
  currentMonth: Date;
  date: Date;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function(props: IProps) {

  const bg = props.date.getDay() === 0 || props.date.getDay() === 6 ? "bg-gray-900" : "";
  const border = isToday(props.date) ? "border-t-4 border-ral-3000" : "border-t border-silver";
  const color = isToday(props.date) ? "text-ral-3000" : isCurrentMonth(props.date) ? "text-silver" : "text-gray-800";

  function isToday(date: Date){
    const today = new Date();
    return (
      today.getDate() === date.getDate() && 
      today.getMonth() === date.getMonth() && 
      today.getFullYear() === date.getFullYear()
    );
  }
  function isCurrentMonth(date: Date){
    return (
      props.currentMonth.getMonth() === date.getMonth() && 
      props.currentMonth.getFullYear() === date.getFullYear()
    );
  }

  return (
    <td className={`px-1 w-full h-1/6`}>
      <div 
        className={`w-full h-full ${border} ${bg}`}
        onClick={props.onClick}
      >
        <div className={`w-full h-1/6 p-2 ${color} text-lg`}>
          <p>{props.date.getDate()}</p>
        </div>
        <div className="w-full h-5/6 overflow-scroll">

        </div>
      </div>
    </td>
  )
}
