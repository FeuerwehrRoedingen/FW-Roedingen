"use client"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";

let isInit = true;

type SearchParams = {
  [key: string]: string;
}
type Dispatch = (cb: ((prev: URLSearchParams) => URLSearchParams)) => void;
export default function (params: SearchParams) {
  const initialSearchParams = new URLSearchParams(useSearchParams());

  if(isInit) {
    for (const [key, value] of Object.entries(params)) {
      if(!initialSearchParams.has(key))
        initialSearchParams.set(key, value);
    }
    isInit = false;
  }

  const [SearchParamsState, setSearchParamsState] = useState(new ReadonlyURLSearchParams(initialSearchParams));
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams:Dispatch = cb => {
    const editableSearchParams = new URLSearchParams(SearchParamsState);
    const newSearchParams = cb(editableSearchParams);

    setSearchParamsState(new ReadonlyURLSearchParams(newSearchParams));
  }

  useEffect(() => {
    router.replace(`${pathname}?${SearchParamsState.toString()}`);
  }, [SearchParamsState]);

  return [SearchParamsState, setSearchParams] as const;
}
