import { withPageAuthRequired } from "@auth0/nextjs-auth0"

async function Page() {

  return (
    <div className="page">
      <p>Quiz</p>
    </div>
  )
}

export default withPageAuthRequired(Page, {
  returnTo: '/games/quiz'
});
