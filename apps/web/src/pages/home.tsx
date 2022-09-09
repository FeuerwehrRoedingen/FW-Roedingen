import Link from 'next/link';
import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect';

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
          <div className="bg-gray-900 text-white pt-2 pl-4 h-20vh w-screen">
            {isBrowser && <h1>Herzlich Willkommen auf der offiziellen Website der FF-Rödingen</h1>}
            <div className='flex flex-col ml-[20px]'>
              <Link href="/impressum">
                Impressum
              </Link>
              <Link href="/impressum/datenschutz">
                Datenschutz
              </Link>
              <Link href="/impressum/kontakt">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}
