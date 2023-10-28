import React from "react"

import { Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from "@nextui-org/react"
import { env } from "env"
import dynamic from "next/dynamic"

const ScalableIFrame = dynamic(() => import("components/scalabaleIFrame"), { ssr: false });

export default function() {

  return (
    <Card
      className="w-full h-full"
    >
      <CardBody
        className="p-0 w-full h-full"
      >
        <ScalableIFrame 
          src={env.NEXT_PUBLIC_MONITOR_URL} 
          innerHeight={1080} 
          innerWidth={1920}
          classNames={{container: 'rounded-lg'}}
        />
      </CardBody>
    </Card>
  )
}
