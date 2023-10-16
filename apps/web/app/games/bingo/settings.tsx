import React from "react"
import { IoIosSettings } from "react-icons/io"
import Popup from "reactjs-popup"

import { start } from "./events"
import { toast } from "react-toastify";

export default function(){

  const [from, setFrom] = React.useState(5_000);
  const [to, setTo] = React.useState(10_000);

  const handleClick = () => {
    start(from, to);
    toast.info("Das Spiel wurde gestartet!");
  }

  return (
    <div className="w-full h-20 pt-4 px-20">
      <div className="w-full h-full flex flex-row items-center justify-evenly border-b border-b-silver">
        <div className="h-full flex flex-row items-center">
          <Popup trigger={<button className="button"> <IoIosSettings size={40}/></button>} modal>
            <div>Modal content here</div>
          </Popup>
        </div>
        <div>
          <button onClick={handleClick}>
            <p className="text-2xl">Start</p>
          </button>
        </div>
      </div>
    </div>
  )
}