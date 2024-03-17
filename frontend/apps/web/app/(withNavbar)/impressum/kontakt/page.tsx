import React from 'react'

import HomeButton from 'components/HomeButton';

interface IProps {}

export default function(props: IProps){

  return (
    <div className='page pt-4 pl-4'>
      <HomeButton />
      <p className='pt-4'>
        Sie können uns per Email erreichen unter 
        <Mail 
          to='info@feuerwehr-roedingen.de' 
          subject=''
          body=''
        />
      </p>
      <p className='pt-4'> 
        Für spezielle Anfragen benutzen sie bitte folgende Email Adressen:
      </p>
      <ul className='pt-4'>
        <li>
          <Mail 
            to='einheitsführung@feuerwehr-roedingen.de'
            subject=''
            body=''
          />
        </li>
        <li>
          <Mail 
            to='geraetewart@feuerwehr-roedingen.de'
            subject=''
            body='' 
          />
        </li>
        <li>
          <Mail 
            to='jugendfeuerwehr@feuerwehr-roedingen.de'
            subject=''
            body='' 
          />
        </li>
        <li>
          <Mail 
            to='it@feuerwehr-roedingen.de'
            subject=''
            body=''
          />
        </li>
      </ul>
    </div>
  )
}

type IMailProps = {
  to: string,
  subject: string,
  body: string
}

function Mail(props: IMailProps){
  const {to, subject, body} = props;
  return (
    <a 
      className='text-ral-3001 ml-4 w-fit'
      href={`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
      >
        {to}
    </a>
  )
}