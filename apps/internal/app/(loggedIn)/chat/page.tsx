import withMemberRoleRequired from "utils/withMemberRoleRequired";

function Page(){

  return (
    <div className="w-full h-full bg-gray-950">
      <h1>Chat</h1>
    </div>
  )
}

export default withMemberRoleRequired(Page);
