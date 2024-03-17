"use client"
import { useSearchParams } from "next/navigation";

import Stack from "./stack";

export default function() {

  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const message = searchParams.get("message");
  const stack = searchParams.get("stack");
  const cause = searchParams.get("cause");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="w-1/2 h-1/2 flex flex-col gap-2 items-center justify-center border border-silver rounded-2xl text-2xl p-10 pb-20 bg-gray-950">
        <h1 className="text-8xl">{name}</h1>
        <h2 className="text-4xl">{message}</h2>
        {cause && <p>{cause}</p>}
        <Stack content={stack} />
      </div>
    </div>
  )
}
