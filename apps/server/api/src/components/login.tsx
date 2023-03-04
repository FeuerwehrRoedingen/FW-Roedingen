import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

import type { SyntheticEvent } from 'react'

type Props = {}

var lock: boolean = false;

async function submit(event: SyntheticEvent, redirect: string, state:string){
  event.preventDefault();

  if(lock){
    return Promise.resolve();
  }
  lock = true;
  const target = event.target as typeof event.target & {
    username: { value: string },
    password: { value: string }
  }
  const code = await fetchLogin(target.username.value, target.password.value);
  lock = false;
  if(code !==''){
    window.location.replace(`${redirect}?code=${code}&state=${state}`)
  }
}

async function fetchLogin(email: string, password: string): Promise<string>{
  return new Promise<string>(async (resolve, _reject) => {
    const toastID = toast.loading('attempting login', {
      closeOnClick: false,
    })  
    try{
      setTimeout(() => {
        lock = false;
        toast.update(toastID, {
          type: 'warning',
          render: 'Timeout',
          isLoading: false,
          autoClose: 2000
        })
        resolve('');
      }, 10_000);

      const response = await fetch('/oauth/authorize',{
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });

      if(response!.status === 401){
        toast.update(toastID, {
          type: 'error',
          render: 'invalid email/password',
          isLoading: false,
          autoClose: 2000
        })
        resolve('');
      }
      if(response!.status === 200){
        toast.update(toastID, {
          type: 'success',
          render: 'welcome',
          isLoading: false,
          autoClose: 2000
        })
        resolve((await response.json()).code);
      }
    }
    catch(error: any){
      toast.update(toastID, {
        type: 'error',
        render: error.message,
        isLoading: false,
        autoClose: 2000
      })
      resolve('');
    }
  });
}

export function Login(_props: Props) {

  let redirect = '';
  let state = '';

  if(typeof window !== 'undefined'){
    //@ts-ignore
    redirect = window.redirect_uri;
    //@ts-ignore
    delete window.redirect_uri;

    //@ts-ignore
    state = window.state;
    //@ts-ignore
    delete window.state;
  }

  return (
    <div className='page'>
      <form className='container' onSubmit={event => submit(event, redirect, state)}>
        <div className='top'>
          <img src='/img/logo.png' height='100%'/>
        </div>
        <div className='inputs'>
          <input type='text'     placeholder='username' name='username' required/>
          <input type='password' placeholder='password' name='password' required/>
        </div>
        <div className='bottom'>
          <div id='version_number'>Version 0.0.1</div>
          <button type='submit' className='submitButton'>
            login
          </button>
        </div>
      </form>
      <ToastContainer theme='dark' position='top-right' autoClose={3000} draggable={false}/>
    </div>
  )
}
