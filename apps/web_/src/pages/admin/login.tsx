import React, { Component } from 'react'

import LoginForm from '../../components/LoginForm'

type Props = {}
type State = {}

export default class Login extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div 
        className='w-screen h-screen bg-gray-900 flex items-center justify-center'
      >
        <LoginForm />
      </div>
    )
  }
}
