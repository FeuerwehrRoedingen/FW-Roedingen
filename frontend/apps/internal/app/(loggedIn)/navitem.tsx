"use client"
import { usePathname } from "next/navigation"
import { NavbarItem, Link } from "@nextui-org/react"

type IProps = {
  exact?: boolean;
  href: string;
  label: string;
}
export default function(props: IProps) {
  const pathname = usePathname();
  
  const isActive = props.exact ? pathname === props.href : pathname.startsWith(props.href);

  return (
    <NavbarItem>
      <Link 
        href={props.href} 
        color={isActive ? "danger": "foreground"}
        size="lg"
      >
        {props.label}
      </Link>
    </NavbarItem>
  )
}