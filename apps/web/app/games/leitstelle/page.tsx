
import { withPageAuthRequired } from "@auth0/nextjs-auth0";


async function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-1/2 h-1/2 opacity-100 bg-gray-950 border-2 border-gray-900 rounded-2xl">

      </div>
    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games/leitstelle'
});
