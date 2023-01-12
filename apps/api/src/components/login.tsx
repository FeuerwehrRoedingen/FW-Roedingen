import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import type { SyntheticEvent } from 'react'

type Props = {}

var lock: boolean = false;

async function submit(event: SyntheticEvent, redirect: string){
  event.preventDefault();

  if(lock){
    return Promise.resolve();
  }
  lock = true;
  const target = event.target as typeof event.target & {
    username: { value: string },
    password: { value: string }
  }
  const success = await fetchLogin(target.username.value, target.password.value);
  lock = false;
  if(success){
    window.location.replace(redirect)
  }
}

async function fetchLogin(username: string, password: string){
  return new Promise<boolean>(async (resolve, _reject) => {
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
        resolve(false);
      }, 10_000);

      const response = await fetch('/oauth/authorize',{
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });

      console.log(response);

      if(response!.status === 401){
        toast.update(toastID, {
          type: 'error',
          render: 'invalid username/password',
          isLoading: false,
          autoClose: 2000
        })
        resolve(false);
      }
      if(response!.status === 200){
        toast.update(toastID, {
          type: 'success',
          render: 'welcome',
          isLoading: false,
          autoClose: 2000
        })
        resolve(true);
      }
    }
    catch(error: any){
      toast.update(toastID, {
        type: 'error',
        render: error.message,
        isLoading: false,
        autoClose: 2000
      })
      resolve(false);
    }
  });
}

function Login(_props: Props) {

  let redirect = '';

  if(typeof window !== 'undefined'){
    //@ts-ignore
    redirect = window.redirect_uri;
    //@ts-ignore
    delete window.redirect_uri;
  }

  return (
    <div className='page'>
      <form className='container' onSubmit={event => submit(event, redirect)}>
        <div className='top'>
          <img src='/img/logo.png' height='100%'/>
        </div>
        <div className='inputs'>
          <input type='text'     placeholder='username' name='username'/>
          <input type='password' placeholder='password' name='password'/>
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

export default Login