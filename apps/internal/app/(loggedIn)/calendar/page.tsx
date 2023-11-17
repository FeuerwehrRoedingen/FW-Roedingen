import { withMemberRoleRequired } from "utils/wrapper/withRoleRequired"
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import('./calendar'), { ssr: false });
const Settings = dynamic(() => import('./settings'), { ssr: false });

type IProps = {
  
}
function Page(props: IProps) {

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-1/6 h-full border-r border-gray-700">
        <Settings />
      </div>
      <div className="w-5/6 h-full">
        <Calendar />
      </div>
    </div>
  )
}

export default withMemberRoleRequired(Page, {
  returnTo: '/calendar'
});
