"use client"

type IProps = {
  error: Error;
  rest: () => void;
}

export default function(props: IProps){
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{props.error.message}</p>
      <button onClick={props.rest}>Try again</button>
    </div>
  )
}
