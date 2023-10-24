
import { IoIosAddCircle } from "react-icons/io";

type IProps = {

}
export default function(props: IProps){
  return (
    <div className="w-full h-full bg-gray-900 text-silver">
      <div className="w-full h-fit p-6">
        <div className="w-full h-fit flex flex-row items-center justify-between">
          <h1 className="text-2xl">Kalender</h1>
          <IoIosAddCircle 
            size={25}
            className="cursor-pointer"
          />
        </div>
        <ul>
          <li>Übungsdienst</li>
        </ul>
      </div>
      <div className="w-full h-fit p-6"> 
        <h1 className="text-2xl">Mitteilungen</h1>
      </div>
    </div>
  )
}