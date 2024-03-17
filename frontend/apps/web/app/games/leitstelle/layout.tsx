type IProps = {
  children: React.ReactNode;
}
export default function(props: IProps){

  return (
    <div className="w-screen h-screen bg-background">
      <div className="light1 absolute top-0 left-32 z-0"/>
      <div className="light2 absolute top-1/4 right-40 z-0"/>
      <div className="light3 absolute bottom-20 left-0 z-0"/>
      <div className="light1 absolute bottom-0 right-1/2 z-0"/>

      <div className="z-10 relative">
        {props.children}
      </div>
    </div>
  )
}
