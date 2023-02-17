"use client"

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'

import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Box from '@mui/material/Box'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { API } from 'fw-roedingen-shared/src/api'

type Props = {}
export default function page(props: Props) {

  const { data, status } = useSession();
  if (status === 'authenticated') {
    window.location.href = '/home';
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [API_Alive, setAPI_Alive] = React.useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000'
      },
      secondary: {
        main: '#c0c0c0'
      },
      mode: 'dark'
    }
  });

  const inputClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> = event => {
    if(!API_Alive){
      event.preventDefault();
      toast.warning('API Server is currently offline', { toastId: 'API_WARN' });
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const credentialsSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    let id = toast.loading('Attempting login');

    let submit = async () => {
      return new Promise<boolean>(async (resolve, reject) => {
        setTimeout(() => resolve(false), 10_000);

        fetch(API + '/oauth//authorize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: username, password })
        })
          .then(async res => {
            if(res.status !== 200){
              resolve(false);
            }
            // TODO exchange code for token

            alert(await res.json());
            
          },reject)
          .catch(reject);
      })
    }

    submit()
      .then(res => {
        if (res) {
          toast.update(id, {
            render: 'success',
            type: 'success',
            isLoading: false,
            autoClose: 3_000
          });
          return;
        }
        toast.update(id, {
          render: 'Email/Password incorrect',
          type: 'error',
          isLoading: false,
          autoClose: 3_000
        });
      }, reason => {
        toast.update(id, {
          render: 'Timeout',
          type: 'warning',
          isLoading: false,
          autoClose: 3_000
        })
      })
      .catch(console.error)
  }
  const emailSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    let id = toast.loading('Sending Email')

    let res = await signIn<'email'>('feuerwehr-roedingen-email', { email, redirect: false });

    if (res?.error === null) {
      toast.update(id, {
        render: 'Email sent',
        type: 'success',
        isLoading: false,
        autoClose: 3_000
      })
      return;
    }

    toast.update(id, {
      render: res?.error,
      type: 'error',
      isLoading: false,
      autoClose: 3_000
    })
  }

  React.useEffect(() => {
    fetch(API + '/public/status')
      .then(res => {
        if (res.status !== 200) {
          setAPI_Alive(false);
        }
      },
        () => setAPI_Alive(false))
      .catch(() => setAPI_Alive(false));
  }, []);

  React.useEffect(() => {
    let url = new URLSearchParams(window.location.search);
    if(url.get('error') === 'Callback'){
      toast.error('something went wrong, please try again', { toastId: 'CALLBACK_ERROR'});
    }
  })

  return (
    <div className='page'>
      <ThemeProvider theme={theme}>
        <div className='upper'>
          <div className='container'>
            <Box className='middle' component="form" onSubmit={credentialsSubmit}>
              <div className='inner'>
                <h1 className='heading'>FWR-Login</h1>
                <div className='inputs'>
                  <FormControl
                    sx={{ m: 1, width: '100%' }}
                    variant='outlined'
                    required
                  >
                    <InputLabel htmlFor='outlined-textfield'>Email</InputLabel>
                    <OutlinedInput
                      id='outlined-textfield'
                      type='text'
                      label='Email'
                      value={username}
                      onChange={event => setUsername(event.target.value)}
                      onClick={inputClick}
                      disabled={!API_Alive}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '100%' }} variant='outlined' required>
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      onClick={inputClick}
                      disabled={!API_Alive}
                      endAdornment={
                        <InputAdornment position='end' >
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                            disabled={!API_Alive}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <div className='button'>
                    <a onClick={() => signIn('feuerwehr-roedingen')}>use oauth?</a>
                    <Button
                      variant='contained'
                      type='submit'
                      onClick={inputClick}
                    >
                      login
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
            <div className='middle'>
              <div className='inner'>
                <h1 className='heading'>Email</h1>
                <form className='inputs' onSubmit={emailSubmit}>
                  <FormControl
                    sx={{ m: 1, width: '100%' }}
                    variant='outlined'
                    required
                  >
                    <InputLabel htmlFor='outlined-textfield2'>Email</InputLabel>
                    <OutlinedInput
                      id='outlined-textfield2'
                      type='text'
                      label='Email'
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                    />
                  </FormControl>
                  <div className='button'>
                    <a href='/docs/help/email'>help</a>
                    <Button
                      variant='contained'
                      type='submit'
                    >
                      send
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='item'>
            <div className='align'>
              <Link href="/docs/impressum">  Impressum  </Link>
              <Link href="/docs/datenschutz">Datenschutz</Link>
            </div>
          </div>
          <div className='item'>
            <a href="https://feuerwehr-roedingen.de">Feuerwehr Roedingen</a>
          </div>
          <div className='item'>
            <div className='align'>
              <Link href="/signup">account erstellen</Link>
              <a href='mailto:support@feuerwehr-roedingen.de'>support</a>
            </div>
          </div>
        </div>
        <ToastContainer theme='dark' position='top-right' autoClose={3000} hideProgressBar={false} />
      </ThemeProvider>
    </div>
  )
}
