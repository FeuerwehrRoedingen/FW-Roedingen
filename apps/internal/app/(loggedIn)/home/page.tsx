import { withMemberRoleRequired } from "utils/withRoleRequired"
import { env } from "env"

import UserCard from "./userCard"
import GroupalarmCard from "./groupalarmCard"
import AppsCard from "./appsCard"

type IProps = {
}
async function Page(props: IProps) {

  return (
    <div className="w-full h-full flex flex-row p-4">
      <div className="w-1/3 h-full pr-2 flex flex-col gap-4">
        <UserCard />
        <AppsCard />
      </div>
      <div className="w-2/3 h-full pl-2 flex flex-col items-center">
        <div className="w-full h-fit max-w-[1000px]">
          <GroupalarmCard />
        </div>
      </div>
    </div>
  )
}

export default withMemberRoleRequired(Page, {
  returnTo: '/home'
});
