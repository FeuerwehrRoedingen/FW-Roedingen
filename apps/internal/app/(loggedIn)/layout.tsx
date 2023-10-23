
import Provider from "./provider"

type IProps = {
  children: React.ReactNode;
}
export default function(props: IProps){
  return (
    <Provider>
      {props.children}
    </Provider>
  )
}
