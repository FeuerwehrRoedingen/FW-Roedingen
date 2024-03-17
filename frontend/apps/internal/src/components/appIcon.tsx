
import { Link, Image } from '@nextui-org/react'

type IProps = {
  name: string,
  icon: string,
  href: string,
  background?: string,
  padding?: number
}

export type App = IProps;

export default function AppIcon(props: IProps){

  return (
    <div className='w-32 flex flex-col items-center'>
      <Link 
        href={props.href} 
        className={`${props.background} rounded-2xl p-${props.padding}`}
        target='_blank'
      >
        <Image src={props.icon}/>
      </Link>
      <h1>{props.name}</h1>
    </div>
  )
}
