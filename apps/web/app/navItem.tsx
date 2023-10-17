"use client"
import { isBrowser } from 'react-device-detect';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type ItemProps = {
  exact?: boolean;
  to: string;
  title: string;
  short?: string;
  children?: React.ReactNode;
}
export default function(props: ItemProps){
  const pathname = usePathname();
  const isActive = props.exact ? pathname === props.to : pathname.startsWith(props.to);

  const color = isActive ? 'ral-3001' : 'silver';

  return (
    <div className={`flex flex-row items-center cursor-pointer w-fit text-${color} duration-150 hover:scale-[1.025] active:scale-[0.975]`}>
      <Link href={props.to}>
        {isBrowser ? props.title: props.short? props.short: props.children}
      </Link>
    </div>
  )
}