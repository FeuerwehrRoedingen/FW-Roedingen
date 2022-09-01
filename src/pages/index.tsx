import React, { Component } from 'react'
import EMailComponent from '../components/EMailComponent';
import UnderConstruction from '../components/UnderConstruction';

type Props = {}
type State = {}

export default class HomePage extends Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
        <div className="page">
          <div className="bg-home w-screen bg-bottom bg-cover h-[55vh] mt-[-3vh] bg-[#333333]">
            <div className="bg-[rgba(0,0,0,0.4)] h-full w-full">
            </div>
          </div>
          <div className="bg-gray-900 text-white py-2 h-20vh w-screen">
            <UnderConstruction/>
          </div>
        </div>
      </>
    )
  }
}
