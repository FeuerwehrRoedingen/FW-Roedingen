import { withPageAuthRequired } from "@auth0/nextjs-auth0"

import UserInfo from "./userInfo"

async function Page() {
  return (
    <div className="w-full h-full">
      <UserInfo />
    </div>
  )
}

export default withPageAuthRequired(Page);