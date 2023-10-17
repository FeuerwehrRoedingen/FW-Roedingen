"use client"
import { Avatar } from '@nextui-org/avatar'
import useUser from "hooks/useUser";

type IProps = {

}
export default function(props: IProps){

  const { user, isLoading } = useUser();

  if(isLoading) {
    return (
      <h1>Loading... </h1>
    )
  }

  if(user){
    return (
      <div className='flex flex-row'>
        <Avatar src={user.picture!} alt={user.name!} size='md' />
        <a className="border border-silver px-4 py-2">Logout</a>
      </div>
    )
  } else {
    return (
      <a className="border border-silver px-8 py-4 rounded-2xl text-silver" href="/api/auth/login">
        Login
      </a>
    )
  }
}
