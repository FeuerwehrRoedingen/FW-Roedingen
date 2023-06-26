import React from 'react'

import Style from './jf.module.css'

type Props = {}

export default function ({}: Props) {
  return (
    <div className={Style.page}>
      <div className={Style.img1_c}>
        <img src='/img/jf/IMG_0707.png' className={Style.img1} height='50%' />
      </div>
      <h1 className={Style.heading}>Eine wirklich starke Truppe</h1>
      <div className={Style.section1}>
        <p className={Style.paragraph1}>
          Die Jugendfeuerwehr stellt die Zukunft der Feuerwehr sicher. Dazu wird spielerisch die Grundlagen der feuerwehrtechnischen Ausbildung vermittelt. Zudem nimmt die Jugendfeuerwehr wichtige Aufgaben im Bereich der allgemeinen Jugendarbeit wahr, wo sie durch verschiedenste Freizeitmaßnahmen bei der Betreuung von Kindern und Jugendlichen mitwirkt.
          Unsere Jugendfeuerwehr hat rund 40 Jugendlichen im Alter von 10 bis 18 Jahren. An den Dienstabenden stehen 2 Betreuer der aktiven Wehr mit Rat und Tat zur Seite. 
          Die feuerwehrtechnische Ausbildung wird in Wettbewerben mit anderen Jugendfeuerwehren gemessen. Natürlich führen wir auch andere Aktivitäten wie Volleyball, Fußball oder Bowling durch. Jährliche Tradition ist unter anderem unser  Sommerzeltlager ( alle 2 Jahre) , Weihnachtsfeier und Jahresabschlussübung. Außerdem üben wir auch mit anderen Jugendfeuerwehren gemeinsam.
          Wir freuen uns immer über weitere Jugendliche, die Lust haben bei uns mitzumachen.
          Für uns sind Kameradschaft und Teamgeist sehr wichtig. Natürlich solltest du auch Interesse an der Feuerwehrarbeit und ehrenamtliches Engagement mitbringen und mindestens 10 Jahre alt sein.
          Wir treffen uns jeden Donnerstag (außerhalb der Ferien) um 18.00 Uhr am Gerätehaus Rödingen.
          Für weitere Fragen nutzt unser Kontaktformular oder unsere Facebookseite.
        </p>
        <div className={Style.pictures}>
          <img src='/img/jf/IMG_0679.png' className={Style.img2}/>
          <img src='/img/jf/IMG_0696.png' className={Style.img2}/>
        </div>
      </div>
    </div>
  )
}