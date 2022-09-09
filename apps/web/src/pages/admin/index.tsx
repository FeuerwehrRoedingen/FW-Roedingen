import { Session } from 'next-auth';
import React, { Component } from 'react'
import { withGuard } from '../../wrapper';

type Props = {
  session: Session;
}
type State = {}

class Admin extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state={}
  }

  render() {
    return (
      <div className='w-screen h-screen bg-gray-900 flex items-center justify-center'>
        <h1>Willkommen</h1>
      </div> 
    )
  }
}

export default withGuard(Admin)