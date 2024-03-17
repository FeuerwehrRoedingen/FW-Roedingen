import Header from './header'

type IProps = {
  children: React.ReactNode
}
export default function (props: IProps) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}
