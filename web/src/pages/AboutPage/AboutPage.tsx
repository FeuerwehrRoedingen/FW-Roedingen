import { MetaTags } from '@redwoodjs/web'
import React, { Component } from 'react'
import UnderConstruction from 'src/components/UnderConstruction/UnderConstruction'

type Props = {}

type State = {}

export default class AboutPage extends Component<Props, State> {
  state = {}

  render() {
    return (
      <>
        <MetaTags title="About" description="About page" />
        <div className="page">
          <UnderConstruction/>
        </div>
      </>
    )
  }
}
