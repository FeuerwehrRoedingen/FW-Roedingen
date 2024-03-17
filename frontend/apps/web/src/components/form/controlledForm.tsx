"use client"

import { useFormState } from "react-dom"

import SubmitButton from "./submitButton"
import { handleError } from "utils/handleError"

export type IState = {
  error: string|null;
  result: any;
}

const initialState = {
  error: null,
  result: null
}

type IProps = {
  action: (prevState: any, formdata: FormData) => Promise<IState>;
  buttonText: string;
  children?: React.ReactNode;
}
export default function(props: IProps) {

  const [state, formAction] = useFormState(props.action, initialState);
  
  if(state.error) {
    handleError(JSON.parse(state.error));
  }

  return (
    <form action={formAction}>
      <div className="w-full h-fit flex flex-col">
        {props.children}
      </div>
      <div className="w-full h-fit flex flex-row items-center justify-end mt-4">
        <SubmitButton text={props.buttonText}/>
      </div>
    </form>
  )
}
