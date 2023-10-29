import { withPageAuthRequired } from "@auth0/nextjs-auth0";

type IProps = {
  params: {
    session: string
  }
}
async function Page(props: IProps){

  await delay(5000);

  return (
    <div className="w-screen h-screen bg-ral-3000">
      {props.params.session}
    </div>
  )
}

// @ts-ignore Record<string, string> aparently is not the same as Record<"session", string> ("session" is a string) :)
export default withPageAuthRequired(Page, {
  returnTo: '/games/leitstelle'
});

async function delay(ms: number){
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
