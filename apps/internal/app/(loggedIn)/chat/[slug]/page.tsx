import React from "react"

import withMemberRoleRequired from "utils/withMemberRoleRequired"

type IProps = {
  params: {
    slug: string
  }
}

async function Page(props: IProps){
  
  return (
    <div>
      <h1>Chat</h1>
      <h2>{props.params.slug}</h2>
    </div>
  )
}
export default withMemberRoleRequired(Page);
