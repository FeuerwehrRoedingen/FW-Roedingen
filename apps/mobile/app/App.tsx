import { Auth0Provider } from 'react-native-auth0'

import { Route, Router } from './router'

import { LoginPage } from './pages/login'
import { HomePage } from './pages/home'


export default function App() {
  return (
    <Auth0Provider domain='fw-roedingen.eu.auth0.com' clientId='Ib9x0oA1YB9N5lbcee33RCu9VMQIT45y'>
      <Router>
        <Route path="/" component={LoginPage}/>
        <Route path="/home" component={HomePage}/>
      </Router>
    </Auth0Provider>
  );
}
