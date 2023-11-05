"use client"
import React from "react";
import { Card, CardBody, CardHeader, Checkbox, CheckboxGroup, Divider, Input, Spacer, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from "@nextui-org/react";
import type { UserProfile } from "@auth0/nextjs-auth0/client";

import { useUserContext } from "./context";
import Actions from "./actions";

export default function () {

  const { users } = useUserContext();

  let i = 0;
  const renderTableEntry = React.useCallback((user: UserProfile) => (
    <TableRow key={i++}>
      <TableCell>
        <User 
          name={user.name}
          description={user.email}
          avatarProps={{radius: 'lg', src: user.picture!}}
        />
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>  </TableCell>
      <TableCell>
        <Actions user={user} />
      </TableCell>
    </TableRow>
  ), []);

  return (
    <div className="flex flex-row h-full w-full">
      <Table aria-label="Users List">
        <TableHeader>
          <TableColumn>Info</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody items={users}>
          {(item) => renderTableEntry(item)}
        </TableBody>
      </Table>
      <div className="w-1/4 h-full pl-8">
        <Card className="w-full h-fit mb-8">
          <CardHeader title="Filter List">
            Filter
          </CardHeader>
          <Divider />
          <CardBody>
            <Input label="Filter" variant="underlined"/>
            <Spacer y={4} />
            <CheckboxGroup label="only show">
              <Checkbox value="active" color="danger">active users</Checkbox>
              <Checkbox value="members" color="danger">members</Checkbox>
            </CheckboxGroup>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
