import { withPageAuthRequired } from "@auth0/nextjs-auth0"

type IProps = {

}
export default function(props: IProps) {

  return (
    <div className="w-screen h-screen pt-8 flex flex-col items-center">
      <h1 className=" text-5xl">FWR Door</h1>
    </div>
  )
}