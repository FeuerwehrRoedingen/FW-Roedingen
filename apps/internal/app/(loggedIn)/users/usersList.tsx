"use client"
import React from "react";
import { Avatar, Card, CardBody, CardHeader, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { useUserContext } from "./context";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export default function () {

  const { users } = useUserContext();
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);

  const rows = users.map((user, index) => (
    <TableRow key={index} onClick={() => setSelectedUser(user)}>
      <TableCell>
        <Avatar src={user.picture!} />
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>  </TableCell>
    </TableRow>
  ));

  return (
    <div className="flex flex-row h-full w-full">
      <Table aria-label="Users List">
        <TableHeader>
          <TableColumn>Bild</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
      <div className="w-1/4 h-full pl-8">
        <Card className="w-full h-fit mb-8">
          <CardHeader title="Filter List">
            Filter
          </CardHeader>
          <Divider />
          <CardBody>
            {/** TODO Filter user List */}
          </CardBody>
        </Card>
        {selectedUser && (
          <Card>
            <CardHeader title="User Details">
              {selectedUser.name}
            </CardHeader>
            <Divider />
            <CardBody>
              {/** TODO show user details (and maybe make editable) */}
            </CardBody>
          </Card>)
        }
      </div>
    </div>
  )
}
