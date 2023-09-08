import { Text, View } from "react-native"

import { SecuredComponentProps } from "../router";

type IHomePageProps = SecuredComponentProps & {

}

export function HomePage(props: IHomePageProps){

  const text = props.user ? 'secured' : 'unsecured';

  return (
    <View>
      <Text>Home Page</Text>
      <Text>{text}</Text>
    </View>
  )
}
