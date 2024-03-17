import { withPageAuthRequired } from "@auth0/nextjs-auth0"

type IProps = {

}
async function Page(props: IProps) {
  
  return (
    <div className="w-full h-full pt-8 flex flex-col items-center">
      <h1 className=" text-5xl">FWR Door</h1>
    </div>
  )
}

export default withPageAuthRequired(Page);
