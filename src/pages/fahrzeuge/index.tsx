import Link from 'next/link'
import React, { Component } from 'react'
import UnderConstruction from '../../components/UnderConstruction'

type Props = {}

type State = {}

export default class index extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
      
        <div className="page">
          <div>
            <Link href="fahrzeuge/mtf">
              MTF
            </Link>
          </div>
          <div>
            <Link href="fahrzeuge/hlf">
              HLF
            </Link>
          </div>
          <div>
            <Link href="fahrzeuge/lzwo">
              L2
            </Link>
          </div>
          <UnderConstruction/>
        </div>
      </>
    )
  }
}