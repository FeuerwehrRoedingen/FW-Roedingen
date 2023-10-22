"use client"
import { usePathname } from "next/navigation"
import { Link } from "@nextui-org/link"

type IProps = {
  exact?: boolean
  path: string
  title: string
}

export default function(props: IProps){
  const pathname = usePathname();

  const isActive = props.exact ? pathname === props.path : pathname.startsWith(props.path);

  return (
    <Link 
      href={props.path}
      color={isActive ? 'primary' : 'foreground'}
      size="lg"
      underline="hover"
    >
      {props.title}
    </Link>
  )
}