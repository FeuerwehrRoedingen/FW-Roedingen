"use client"

import React from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'

import './signup.css'

type LG = 'Ameln'|'Gevelsdorf'|'Hasselsweiler'|'Jackerath'|'Muentz'|'Operthen'|'Roedingen'|'Titz';

type LG_EMAIL_MAP = {
  [key in LG]: string
}

const LG_EMAIL: LG_EMAIL_MAP = {
  'Ameln'         : '?',
  'Gevelsdorf'    : '?',
  'Hasselsweiler' : '?',
  'Jackerath'     : '?',
  'Muentz'        : '?',
  'Operthen'      : '?',
  'Roedingen'     : 'feuerwehr-roedingen.de',
  'Titz'          : 'fftitz.org',
}


type Props = {}
export default function Signup({}: Props) {

  const [name, setName]       = React.useState('');
  const [preName, setPreName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [lg, setLg] = React.useState<LG>('Roedingen');

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

  return (
    <div className='page'>
      <ThemeProvider theme={theme}>
        <form className='container'>
          <div className='heading'>
            <h1>Account erstellen</h1>
          </div>
          <div className='row'>
            <FormControl sx={{m: 1, width:'100%'}}>
              <InputLabel htmlFor='name-input'>Name</InputLabel>
              <OutlinedInput
                id='name-input'
                label="Name"
                onChange={event => setName(event.target.value)} 
                value={name}
              />
            </FormControl>
            <FormControl sx={{m: 1, width:'100%'}}>
              <InputLabel htmlFor='prename-input'>Vorname</InputLabel>
              <OutlinedInput 
                id='prename-input'
                label="Vorname"
                onChange={event => setPreName(event.target.value)} 
                value={preName}
              />
            </FormControl>  
          </div>
          <div className='row'>
            <FormControl sx={{m: 1, width:'100%'}}>
              <InputLabel htmlFor='email-input'>Email</InputLabel>
              <OutlinedInput 
                id='email-input'
                label="Email"
                onChange={event => setEmail(event.target.value)} 
                value={email}
              />
            </FormControl >
            <FormControl 
              disabled
              sx={{m: 1, width:'100%'}}
            >
              <OutlinedInput 
                value={'@'+LG_EMAIL[lg]}
              />
            </FormControl>
          </div>
        </form>
      </ThemeProvider>
    </div>
  )
}
