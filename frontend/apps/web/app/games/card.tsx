import { Card, CardBody, CardHeader, Link } from "@nextui-org/react"

type IProps = {
  title: string;
  href: string;
  children: React.ReactNode;
}
export default function (props: IProps) {

  return (
    <Card 
      as={Link} 
      href={props.href}
      className="w-64 h-64 text-ral-1026 bg-ral-3000 border border-ral-1026 p-8"
    >
      <CardHeader className="flex items-center justify-center">
        <h1 className="text-4xl">
          {props.title}
        </h1>
      </CardHeader>
      <CardBody className="flex items-center justify-center">
        {props.children}
      </CardBody>
    </Card>
  )
}