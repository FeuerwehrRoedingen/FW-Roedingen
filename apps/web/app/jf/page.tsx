import React from 'react'

type Props = {}

export default function ({}: Props) {
  return (
    <div className='page overflow-scroll overscroll-none items-center'>
      <div className='h-[60vh] w-full'>
        <img src='/img/jf/IMG_0707.png' className='jf_header' height='50%' />
      </div>
      <h1 className='text-ral-3000 underline text-[80px]'>
        Eine wirklich starke Truppe
      </h1>
      <div className='h-fit w-full flex flex-row text-silver pt-6'>
        <p className='w-1/2 p-4 text-[25px]'>
          Die Jugendfeuerwehr stellt die Zukunft der Feuerwehr sicher. 
          Dazu werden spielerisch die Grundlagen der feuerwehrtechnischen Ausbildung vermittelt. 
          Zudem nimmt die Jugendfeuerwehr wichtige Aufgaben im Bereich der allgemeinen Jugendarbeit wahr, 
          wo sie durch verschiedenste Freizeitmaßnahmen bei der Betreuung von Kindern und Jugendlichen mitwirkt.
          Unsere Jugendfeuerwehr besteht aus rund 40 Jugendlichen im Alter von 10 bis 18 Jahren. 
          An den Dienstabenden stehen 2 Betreuer der aktiven Wehr mit Rat und Tat zur Seite. 
          Die feuerwehrtechnische Ausbildung wird in Wettbewerben mit anderen Jugendfeuerwehren gemessen. 
          Natürlich führen wir auch andere Aktivitäten wie Volleyball, Fußball oder Bowling durch. 
          Jährliche Tradition ist unter anderem unser  Sommerzeltlager ( alle 2 Jahre) , Weihnachtsfeier und Jahresabschlussübung. 
          Außerdem üben wir auch mit anderen Jugendfeuerwehren gemeinsam.
          Wir freuen uns immer über weitere Jugendliche, die Lust haben bei uns mitzumachen.
          Für uns sind Kameradschaft und Teamgeist sehr wichtig. 
          Natürlich solltest du auch Interesse an der Feuerwehrarbeit und ehrenamtliches Engagement mitbringen und mindestens 10 Jahre alt sein.
          Wir treffen uns jeden Donnerstag (außerhalb der Ferien) um 18.00 Uhr am Gerätehaus Rödingen.
          Für weitere Fragen nutzt gerne unser 
          <a href='/impressum/kontakt' className='text-ral-3000 px-2'>Kontaktformular</a> 
          oder unsere 
          <a href='https://www.facebook.com/FreiwilligeFeuerwehrTitzLGRoedingen/' className='text-ral-3000 px-2'>Facebookseite</a>.
        </p>
        <div className='w-1/2 flex flex-col pr-4'>
          <img src='/img/jf/IMG_0679.png' className='h-1/2 w-full object-cover mb-4'/>
          <img src='/img/jf/IMG_0696.png' className='h-1/2 w-full object-cover mb-4'/>
        </div>
      </div>
    </div>
  )
}
