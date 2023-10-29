
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

async function Page() {
  return (
    <div className="w-screen h-screen bg-ral-3000">

    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games/leitstelle'
});