import withMemberRoleRequired from "utils/withMemberRoleRequired"

type IProps = {
}

async function Page(props: IProps) {

  return (
    <div className="w-full h-full">
      <h1>Home</h1>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export default withMemberRoleRequired(Page);
