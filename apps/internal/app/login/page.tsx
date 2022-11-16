"use client";

import { Agent } from 'https'
import React, { SyntheticEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import './login.css'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation';

type Props = {}

var lock: boolean = false;
const agent = new Agent({
  rejectUnauthorized: false
});

async function submit(event: SyntheticEvent, redirect: ()=>void){
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
    redirect();
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

      const response = await fetch('https://10.21.21.22:3024/login/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if(response.status === 401){
        toast.update(toastID, {
          type: 'error',
          render: 'invalid username/password',
          isLoading: false,
          autoClose: 2000
        })
        resolve(false);
      }
      if(response.status === 200){
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

function Login(props: Props) {
  const version = '0.0.0'
  const router = useRouter();
  return (
    <div className='page'>
      <form className='container' onSubmit={(event) => submit(event, () => router.push('/home'))}>
        <div className='top'>
          <img src='/logo.png' height='100%'/>
        </div>
        <div className='inputs'>
          <input type='text'     placeholder='username' name='username'/>
          <input type='password' placeholder='password' name='password'/>
        </div>
        <div className='bottom'>
          <a id='version_number'>Version {version}</a>
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