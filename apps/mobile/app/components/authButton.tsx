import { Button } from 'react-native'
import { useAuth0 } from 'react-native-auth0'

type IButtonProps = {
}
export const LoginButton = (props: IButtonProps) => {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try{
      await authorize({scope: 'openid profile email'}, {customScheme: 'fwr'});
    }
    catch(error){
      console.log(error);
    }
  }

  return <Button title="Log in with Auth0" onPress={onPress} color='red'/>
}

export const LogoutButton = (props: IButtonProps) => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try{
      await clearSession({customScheme: 'fwr'});
    }
    catch(error){
      console.log(error);
    }
  }

  return <Button title="Log out" onPress={onPress} color='red'/>
}
