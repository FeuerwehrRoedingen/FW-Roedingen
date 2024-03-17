"use client"
import { useSearchParams } from "next/navigation"

export default function(){

  const searchParams = useSearchParams();

  const _name = searchParams.get("name");
  const _message = searchParams.get("message");
  const _stack = searchParams.get("stack");
  const _cause = searchParams.get("cause");

  const name = _name === "undefined" ? "500" : _name;
  const message = _message === "undefined" ? "Ein unerwarteter Fehler ist aufgetreten" : _message;
  const stack = _stack ? JSON.parse(_stack) : null;
  const cause = _cause ? JSON.parse(_cause) : null;

  //TODO format stack and cause

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/2 h-1/2 border border-gray-900 rounded-2xl flex flex-col items-center justify-center">
        <h1 className="text-8xl">{name}</h1>
        <h2 className="text-4xl mb-4">{message}</h2>
        <h4>{_cause}</h4>
        <h4>{_stack}</h4>
      </div>
    </div>
  )
}
