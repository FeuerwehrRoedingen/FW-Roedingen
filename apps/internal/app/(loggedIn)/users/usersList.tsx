"use client"
import { Avatar, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { useUserContext } from "./context";

export default function () {

  const { users } = useUserContext();

  const rows = users.map((user, index) => (
    <TableRow key={index}>
      <TableCell>
        <Avatar src={user.picture!} />
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  ));

  return (
    <Table aria-label="Users List">
      <TableHeader>
        <TableColumn>Bild</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
      </TableHeader>
      <TableBody>
        {rows}
      </TableBody>
    </Table>
  )
}
