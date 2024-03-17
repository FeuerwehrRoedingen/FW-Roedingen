import { withAdminRoleRequired } from "utils/wrapper/withRoleRequired";
import type { UserProfile } from "@auth0/nextjs-auth0/client";

import UsersList from "./usersList";
import AddUser from "./addUser";
import Filter from "./filter";

import { fetchApi } from "utils/data/api";
import handleError from "utils/handler/handleError";
import { Provider } from "components/users/context";
import Modal from "components/users/modal";


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
        <div className="w-full">

        </div>
        <div className="w-full h-3/4 flex flex-row">
          <UsersList />
          <div className="w-1/4 h-fit ml-8">
            <Filter />
            <AddUser />
          </div>
        </div>
      </div>
      <Modal />
    </Provider>
  )
}

export default withAdminRoleRequired(Page, {
  returnTo: 'admin/users'
});
