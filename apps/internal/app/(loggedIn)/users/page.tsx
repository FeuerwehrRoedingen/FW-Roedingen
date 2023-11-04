import withMemberRoleRequired from "@/src/utils/withMemberRoleRequired";
import type { UserProfile } from "@auth0/nextjs-auth0/client";

import { Provider } from "./context";
import UsersList from "./usersList";

import { fetchApi } from "utils/api";

async function Page(){

  const initialUsers: UserProfile[] = []; 
  const res =  await fetchApi('/user');
  console.log(res);

  return (
    <Provider initialUsers={initialUsers}>

      <UsersList />
    </Provider>
  )
}

export default withMemberRoleRequired(Page, {
  returnTo: '/users'
});
