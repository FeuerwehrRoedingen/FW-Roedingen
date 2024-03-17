import { withAdminRoleRequired } from "utils/wrapper/withRoleRequired"

async function Page(){

  return (
    <div>

    </div>
  )
}

export default withAdminRoleRequired(Page, {
  returnTo: '/admin/logs'
});