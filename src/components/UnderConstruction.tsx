import React, { Component } from 'react'

type Props = {}

type State = {}

export default class UnderConstruction extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="underConstruction">
        <h1>Diese Seite Befindet sich im Aufbau</h1>
        <div>
          Vielen Dank für ihren Besuch auf unserer Webseite! <br/>
          Da unsere Webseite gerade komplett überarbeiter wird, <br/>
          sind nicht alle Seiten erreichbar.<br/>
          Schauen sie in ein paar Tagen nochmal vorbei.<br/>
          <br/>
          - Admin der Webseite FM Thomas Düren
        </div>
      </div>
    )
  }
}
