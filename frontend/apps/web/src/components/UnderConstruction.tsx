import React, { Component } from 'react'

type Props = {}

type State = {}

export default class UnderConstruction extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="ml-4 mt-0 text-silver">
        <h1>Diese Seite befindet sich im Aufbau</h1>
        <div>
          Vielen Dank für Ihren Besuch auf unserer Webseite! <br/>
          Da unsere Webseite gerade komplett überarbeitet wird, <br/>
          sind nicht alle Seiten erreichbar.<br/>
          Schauen Sie gern in ein paar Tagen nochmal vorbei.<br/>
          <br/>
          - Admin der Webseite FM Thomas Düren
        </div>
      </div>
    )
  }
}
