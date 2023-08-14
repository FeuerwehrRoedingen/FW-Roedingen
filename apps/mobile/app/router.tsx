import React from "react"
import { useAuth0, User } from "react-native-auth0"

import { NotFoundPage } from "./pages/404";

type RouterRef = {
  navigate: (path: string) => void;
}
const routerRef = React.createRef<RouterRef>();

//---------------------------------------------------------------------------
// functions
//---------------------------------------------------------------------------
export function navigate(path: string) {
  if(routerRef.current) {
    routerRef.current.navigate(path);
  }
}

type IProps = IRouterProps & {

}
const _Router = React.forwardRef<RouterRef, IProps>((props, ref) => {

  //---------------------------------------------------------------------------
  // State
  //---------------------------------------------------------------------------
  const [path, setPath] = React.useState<string>("/");

  //---------------------------------------------------------------------------
  // Ref Handle
  //---------------------------------------------------------------------------
  React.useImperativeHandle(ref, () => {
    return {
      navigate: (path: string) => setPath(path)
    }
  });

  //---------------------------------------------------------------------------
  // JSX
  //---------------------------------------------------------------------------

  const isSecured = (component: React.FC<any>): component is React.FC<SecuredComponentProps> => {
    

    return false;
  }

  if(props.children instanceof Array && props.children.length > 0) {
    const { user } = useAuth0();

    for(let i = 0; i < props.children.length; i++) {
      const route = props.children[i];
      if(route.props.path === path) {

        if(isSecured(route.props.component)) {
          if(user) {
            const Component = route.props.component as React.FC<SecuredComponentProps>;
            return <Component user={user}/>
          }
          navigate("/");
          return;
        }
        const Component = route.props.component as React.FC<UnsecuredComponentProps>;
        return <Component/>
      }
    }
  }

  return (
    <NotFoundPage />
  )
})

//---------------------------------------------------------------------------
// Router
//---------------------------------------------------------------------------
type IRouterProps = {
  children: React.ReactElement<IRouteProps>[] | React.ReactElement<IRouteProps>;
}
export function Router(props: IRouterProps) {
  return <_Router ref={routerRef} {...props}/>
}

//---------------------------------------------------------------------------
// Route
//---------------------------------------------------------------------------

export type SecuredComponentProps = {
  user: User;
}
export type UnsecuredComponentProps = {
}

type ComponentProps = SecuredComponentProps | UnsecuredComponentProps;

type SecuredRouteProps = {
  path: string;
  component: React.FC<SecuredComponentProps>;
}
type UnsecuredRouteProps = {
  path: string;
  component: React.FC<UnsecuredComponentProps>;
}
type IRouteProps = SecuredRouteProps | UnsecuredRouteProps;


export function Route(props: IRouteProps) {
  return <></>
}
