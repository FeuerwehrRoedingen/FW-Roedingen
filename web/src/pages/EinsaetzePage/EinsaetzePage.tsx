import React, { Component } from 'react'
import { MetaTags } from '@redwoodjs/web'

import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction'

type Props = {}

type State = {}

export default class EinsaetzePage extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <MetaTags title="Einsaetze" description="Einsaetze page" />
        <div className="page">
          <UnderConstruction/>
        </div>
      </>
    )
  }
}
