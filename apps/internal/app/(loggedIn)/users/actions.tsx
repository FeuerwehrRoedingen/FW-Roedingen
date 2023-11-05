import { Tooltip } from '@nextui-org/react'
import { AiOutlineEdit, AiOutlineUsergroupDelete } from 'react-icons/ai'
import type { UserProfile } from '@auth0/nextjs-auth0/client'

import { useUserContext } from './context'

type IProps = {
  user: UserProfile 
}
export default function(props: IProps) {

  const { deleteUser, selectUser, setShowModal } = useUserContext();

  function handleEdit() {
    selectUser(props.user.sub!);
    setShowModal(true);
  }
  function handleDelete() {
    deleteUser(props.user);
  }

  return (
    <>
      <div className='w-full h-full flex flex-row items-center justify-evenly'>
        <Tooltip content="Edit user">
          <button onClick={handleEdit}>
            <AiOutlineEdit size={25} className="text-gray-600"/>
          </button>
        </Tooltip>
        <Tooltip color="danger" content="Delete User">
          <button onClick={handleDelete}>
            <AiOutlineUsergroupDelete size={30} className="text-ral-3000"/>
          </button>
        </Tooltip>
      </div>
    </>
  )
}
