
import Header from "./header";
import Provider from "./provider"

type IProps = {
  children: React.ReactNode;
}
export default function(props: IProps){
  return (
    <Provider>
      <Header />
      <main className="w-screen h-[calc(100vh-65px)] overflow-scroll">
        {props.children}
      </main>
    </Provider>
  )
}
