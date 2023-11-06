"use client"
import React from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react";
import { AiOutlineEdit, AiOutlineUsergroupDelete } from 'react-icons/ai'
import type { UserProfile } from "@auth0/nextjs-auth0/client";

import { useUserContext } from "components/users/context";

export default function () {

  const { users, deleteUser, selectUser, setShowModal } = useUserContext();

  let i = 0;
  const renderTableEntry = React.useCallback((user: UserProfile) => {

    function handleEdit() {
      selectUser(user);
      setShowModal(true);
    }
    function handleDelete() {
      deleteUser(user);
    }

    return (
      <TableRow key={i++}>
        <TableCell>
          <User
            name={user.name}
            description={user.email}
            avatarProps={{ radius: 'lg', src: user.picture! }}
          />
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>  </TableCell>
        <TableCell>
          <div className='w-full h-full flex flex-row items-center justify-evenly'>
            <Tooltip content="Edit user">
              <button onClick={handleEdit}>
                <AiOutlineEdit size={25} className="text-gray-600" />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete User">
              <button onClick={handleDelete}>
                <AiOutlineUsergroupDelete size={30} className="text-ral-3000" />
              </button>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    )
  }, []);

  return (
    <div className="flex flex-row h-full w-full">
      <Table
        aria-label="Users List"
        isHeaderSticky
        classNames={{ wrapper: 'bg-gray-900', th: 'bg-gray-950' }}
      >
        <TableHeader className="bg-gray-950">
          <TableColumn>Info</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody items={users}>
          {(item) => renderTableEntry(item)}
        </TableBody>
      </Table>
    </div>
  )
}
