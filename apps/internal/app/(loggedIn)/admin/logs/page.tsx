import { withAdminRoleRequired } from "utils/withRoleRequired"

async function Page(){

  return (
    <div>

    </div>
  )
}

export default withAdminRoleRequired(Page, {
  returnTo: '/admin/logs'
});