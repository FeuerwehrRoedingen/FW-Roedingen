import React, { ChangeEvent, Component } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { FaEye, FaEyeSlash } from 'react-icons/fa/index.js'
import { ToastContainer, toast } from 'react-toastify'

/**************************************************************************************************
 *    ___                   __     ___                                                            *
 *   / _ \ ___  ___   ___  / /_   / _ \ ___   ___   ___                                           *
 *  / , _// -_)/ _ `// __// __/  / ___// _ `// _ `// -_)                                          *
 * /_/|_| \__/ \_,_/ \__/ \__/  /_/    \_,_/ \_, / \__/                                           *
 *                                          /___/                                                 *
 **************************************************************************************************/

/** */
type Props = {
  version_number: string
};
type State = {
  client_id:    string | null;
  redirect:     string | null;
  redirect_uri: string | null;

  usernameInput: string;
  passwordInput: string;
  showPassword: boolean;

  version: string;
};

export class Login extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      // Query params
      client_id:    null,
      redirect:     null,
      redirect_uri: null,

      // State
      usernameInput: '',
      passwordInput: '',
      showPassword: false,

      // Version Infered from invisible <a>
      version: ''
    };
  }
  
  // get the query parameters after the component has been mounted to the DOM
  componentDidMount(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const version = document.getElementById('version_number')?.className!;
    
    this.setState({
      client_id: urlParams.get('client_id'),
      redirect: urlParams.get('redirect'),
      redirect_uri: urlParams.get('redirect_uri'),
      version
    })
  }

  onUsernameChange = (event:ChangeEvent<HTMLInputElement>) => {
    this.setState({usernameInput: event.target.value});
  }
  onPasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
    this.setState({passwordInput: event.target.value});
  }
  onTogglePassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }
  onSubmit = async () => {
    const id = toast.loading('Prüfe Anmeldedaten',{
      position: 'top-right',
      theme: 'dark',
      isLoading: true,
      draggable: true,
      pauseOnHover: true
    });

    function fetchLogin(
      username: string,
      password: string,
      redirect: string,
      redirect_uri: string,
      client_id: string
    ){
      return new Promise<boolean>(async function(resolve, reject){
        setTimeout(() => reject(), 5_000);
        const result = await fetch('/oauth/authorize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username, 
            password,
            redirect,
            redirect_uri,
            client_id 
          })
        });
        console.log(result);
        resolve(result.ok);
      })
    }

    try{
      const result = await fetchLogin(
        this.state.usernameInput,
        this.state.passwordInput,
        this.state.redirect!,
        this.state.redirect_uri!,
        this.state.client_id!
      )
      setTimeout(() => {
        if(result){
          toast.update(id, {
            position: 'top-right',
            theme: 'dark',
            isLoading: false,
            draggable: true,
            pauseOnHover: true,
            type: 'success',
            render: 'Willkommen',
            autoClose: 2_000
          })
        } else {
          toast.update(id, {
            position: 'top-right',
            theme: 'dark',
            isLoading: false,
            draggable: true,
            pauseOnHover: true,
            type: 'error',
            render: 'Benutzername/Passwort inkorrekt',
            autoClose: 2_000
          })
        }
      }, 1_000)
    }
    catch(error){
      toast.update(id,{
        position: 'top-right',
        theme: 'dark',
        isLoading: false,
        draggable: true,
        pauseOnHover: true,
        type: 'warning',
        render: 'Timeout',
        autoClose: 5_000
      })
    }
  }

  render() {
    const icon = this.state.showPassword?
      <FaEyeSlash onClick={this.onTogglePassword} className='icon' size='25px'/>:
      <FaEye onClick={this.onTogglePassword} className='icon' size='25px'/>;
    return (
      <div className='page'>
        <div className='container'>
          <div className='top'>
            <img src='/img/Logo.png' className='logo'></img>
            <a>Feuerwehr Rödingen</a>
          </div>
          <div className='inputs'>
            <input 
              placeholder='Username'
              value={this.state.usernameInput}
              onChange={this.onUsernameChange}
              type='text'
            ></input>
            <div className='passwordContainer'>
              <input 
                placeholder='Password'
                value={this.state.passwordInput}
                onChange={this.onPasswordChange}
                type={this.state.showPassword?'text':'password'}
              ></input>
              {icon}
            </div>
          </div>
          <div className='bottom'>
            <a>version: {this.state.version}</a>
            <button onClick={this.onSubmit} className='submitButton'>Anmelden</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

/**************************************************************************************************
 *    __ __          __            __   _         
 *   / // / _ __ ___/ /______ _   / /_ (_) __   ___ 
 *  / _  // // // _  // __// _ `// __// // _ \ / _ \
 * /_//_/ \_, / \_,_//_/   \_,_/ \__//_/ \___//_//_/
 *       /___/                
 **************************************************************************************************/
if(typeof window !== 'undefined'){
  const root = document.getElementById('root');
  
  if(root === null){
    alert('Error hydrating page, root Div not found')
  } else {
    ReactDOMClient.hydrateRoot(root, React.createElement(Login));
  }
}
