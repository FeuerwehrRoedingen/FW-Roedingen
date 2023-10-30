import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type IProps = {
  heading: string;
  children?: React.ReactNode;
}
export default function (props: IProps) {

  return (
    <Card 
      className="bg-ral-3001 border-2 border-ral-1026 opacity-75 hover:opacity-100 w-80" 
    >
      <CardHeader className="flex items-center justify-center">
        <h1 className="text-ral-1026">{props.heading}</h1>
      </CardHeader>
      <Divider />
      <CardBody className="text-silver">
        {props.children}
      </CardBody>
    </Card>
  )
}
