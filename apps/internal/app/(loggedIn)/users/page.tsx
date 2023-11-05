import withMemberRoleRequired from "@/src/utils/withMemberRoleRequired";
import type { UserProfile } from "@auth0/nextjs-auth0/client";

import { Provider } from "./context";
import UsersList from "./usersList";

import { fetchApi } from "utils/api";
import handleError from "@/src/utils/handleError";

//TODO add input form to add new users

async function Page(){

  const res =  await fetchApi('/user');
  if(res.status !== 200)
    handleError({
      message: res.statusText,
      name: res.status.toString()
    });

  const initialUsers: UserProfile[] = await res.json(); 

  return (
    <Provider initialUsers={initialUsers}>
      <div className="w-full h-full p-8">

        <UsersList />
      </div>
    </Provider>
  )
}

export default withMemberRoleRequired(Page, {
  returnTo: '/users'
});
