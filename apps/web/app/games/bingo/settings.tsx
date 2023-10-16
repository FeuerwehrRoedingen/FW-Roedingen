"use client"
import React from "react"
import { IoIosSettings } from "react-icons/io"
import Popup from "reactjs-popup"
import { Id, toast } from "react-toastify";

import { start, pause } from "./events"

export default function(){

  const [from, setFrom] = React.useState(5_000);
  const [to, setTo] = React.useState(10_000);

  let pauseID: Id | undefined;
  let startID: Id | undefined;
  let started: boolean = false;

  const handleStart = () => {
    if(started)
      return;
    started = true;

    if(pauseID)
      toast.dismiss(pauseID);

    start(from, to);
    startID = toast.info("Das Spiel wurde gestartet!");
  }
  const handlePause = () => {
    if(!started)
      return;
    started = false;

    if(startID)
      toast.dismiss(startID);

    pause();
    pauseID = toast.info("Das Spiel wurde pausiert!", { autoClose: false, hideProgressBar: true });
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
          <button onClick={handleStart} className="border border-silver rounded-lg px-4 py-2 mr-6 hover:bg-silver hover:text-[#111827] active:scale-95 duration-200">
            <p className="text-2xl">Start</p>
          </button>
          <button onClick={handlePause} className="border border-silver rounded-lg px-4 py-2 hover:bg-silver hover:text-[#111827] active:scale-95 duration-200">
            <p className="text-2xl">Pause</p>
          </button>
        </div>
      </div>
    </div>
  )
}
