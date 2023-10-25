import withMemberRoleRequired from "utils/withMemberRoleRequired";

function Page(){

  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default withMemberRoleRequired(Page);
