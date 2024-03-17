"use client"

type IProps = {
  content: string|null;
}
export default function(props: IProps) {

  if(!props.content)
    return null;

  const firstLine = (
    <div>
      <span className="text-gray-400">
        {props.content.split("at")[0].trim()}
      </span>
    </div>
  )

  const lines = props.content.split("at").slice(1).map((line, id) => (
    <div key={id} className="pl-2">
      <span className="text-gray-700 mr-1">at</span>
      <span className="text-gray-400">
        {line.trim()}
      </span>
    </div>
  ))

  return (
    <div className="w-[90%] h-fit max-h-[40%] overflow-x-scroll rounded-lg p-2 bg-gray-900 text-sm">
      {firstLine}
      {lines}
    </div>
  )
}