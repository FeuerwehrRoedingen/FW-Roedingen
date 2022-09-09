import { NextRouter } from 'next/router'
import React, { Component } from 'react'
import { toast } from 'react-toastify'

import { withRouter } from '../wrapper'

type Props = {
  router: NextRouter;
}
type State = {}

class LoginForm extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      visible: false
    }
  }

  submit = async() => {
    const id = toast.loading('Anmeldedaten werden geprüft');
    try{
      const res = await this.fetchLogin()
      if(res === 200){
        toast.update(id, {
          render: 'erfolgreich',
          type: toast.TYPE.SUCCESS,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          draggable: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          theme: 'dark',
          isLoading: false
        })
      } else if(res === 400){
        toast.update(id, {
          render: 'falscher Benutzername/ falsches Passwort',
          type: toast.TYPE.ERROR,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          draggable: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          theme: 'dark',
          isLoading: false
        })
      } else {
        toast.update(id, {
          render: 'interner Fehler',
          type: toast.TYPE.ERROR,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          draggable: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          theme: 'dark',
          isLoading: false
        })
      }
    }
    catch(error){
      toast.update(id, {
        render: toast.TYPE.INFO,
        type: 'warning',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        draggable: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        theme: 'dark',
        isLoading: false
      })
    }
  }

  async fetchLogin(){
    return new Promise<number>(async function(resolve, reject){
      setTimeout(()=>reject(),10000);
      try{
        //fetch login
        setTimeout(()=>{resolve(500)},1000)
        //resolve(200);
      }
      catch(error){
        if(process.env.NODE_ENV !== 'development'){
          console.error(error);
          resolve(500)
        }
      }
    });
  }

  render() {
    return (
      <div className='loginForm'>
        <h1 className='text-4xl text-silver'>Interner Login</h1>
        <div className='flex flex-col justify-center items-center'>
          <input 
            className='mb-10'
          />
          <input
            className='mb-0'
          />
        </div>
        <div className='text-xl text-silver flex flex-row justify-between'>
          <button 
            className='w-fit mr-20'
            onClick={() => this.props.router.back()}
          >
            Abbrechen
          </button>
          <button 
            className='w-fit'
            onClick={this.submit}
          >
            Anmelden
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginForm);
