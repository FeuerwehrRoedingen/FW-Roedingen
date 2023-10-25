import React from "react";

type IProps = {
  options: string[];
  onChange: (value: string) => void;
}
export default function(props: IProps){

  const [selected, setSelected] = React.useState(props.options[props.options.length - 1]);

  function handleClick(option: string){
    props.onChange(option);
    setSelected(option);
  }

  const optionElements = props.options.map((option, id) => {

    const active = option === selected ? 'bg-gray-900': '';
    const border = (id !== props.options.length -1 && option !== selected) ? 'border-r border-gray-800 mr-[-1px]': '';

    return (
      <div 
        className={`w-full h-4 flex flex-row items-center ${border}`}
        key={`${option}-li`}
      >
        <div 
          className={`rounded-lg w-28 h-8 flex items-center justify-center cursor-pointer ${active} active:bg-gray-900 duration-300`}
          onClick={() => handleClick(option)}
        >
          {option}
        </div>
      </div>
    )
  });

  return (
    <div className="rounded-lg bg-gray-700 flex flex-row p-[2px] h-[36px] items-center">
      {optionElements}
    </div>
  )
}
