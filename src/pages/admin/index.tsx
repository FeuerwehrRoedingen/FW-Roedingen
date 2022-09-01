import React, { Component } from 'react'

type Props = {}

type State = {
  showPassword: boolean;
}

export default class Admin extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state={
      showPassword: false
    }
  }

  render() {
    return (
      <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
        <div className='loginForm'>
          <div className='flex flex-col justify-evenly'>
            <input type='text'/>
            <input type={this.state.showPassword ? 'text':'password'} />
          </div>
        </div>
      </div> 
    )
  }
}