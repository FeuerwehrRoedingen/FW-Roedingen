"use client"
import React from 'react'
import { BrowserView, MobileView, isBrowser } from 'react-device-detect'

type Props = {}

export default function ({ }: Props) {
  return (
    <div className='page overflow-scroll overscroll-none'>
      <BrowserView>
        <div className='flex flex-col items-center px-4'>
          <h1 className='text-ral-3000 underline text-[80px]'>
            Eine wirklich starke Truppe
          </h1>
          <div className='w-full h-fit flex flex-row'>
            <img src='/img/jf/IMG_0707.png' className='w-1/2 h-auto object-cover mb-4 rounded-br-2xl' />
            <p className='w-1/2 p-4 text-[25px] flex items-center justify-center'>
              Die Jugendfeuerwehr stellt die Zukunft der Feuerwehr sicher.
              Dazu werden spielerisch die Grundlagen der feuerwehrtechnischen Ausbildung vermittelt.
              Zudem nimmt die Jugendfeuerwehr wichtige Aufgaben im Bereich der allgemeinen Jugendarbeit wahr,
              wo sie durch verschiedenste Freizeitmaßnahmen bei der Betreuung von Kindern und Jugendlichen mitwirkt.
              Unsere Jugendfeuerwehr besteht aus rund 40 Jugendlichen im Alter von 10 bis 18 Jahren.
              An den Dienstabenden stehen 2 Betreuer der aktiven Wehr mit Rat und Tat zur Seite.
            </p>
          </div>
          <div className='w-full h-fit flex flex-row'>
            <p className='w-1/2 p-4 text-[25px] flex items-center justify-center'>
              Die feuerwehrtechnische Ausbildung wird in Wettbewerben mit anderen Jugendfeuerwehren gemessen.
              Natürlich führen wir auch andere Aktivitäten wie Volleyball, Fußball oder Bowling durch.
              Jährliche Tradition ist unter anderem unser  Sommerzeltlager ( alle 2 Jahre) , Weihnachtsfeier und Jahresabschlussübung.
              Außerdem üben wir auch mit anderen Jugendfeuerwehren gemeinsam.
              Wir freuen uns immer über weitere Jugendliche, die Lust haben bei uns mitzumachen.
              Für uns sind Kameradschaft und Teamgeist sehr wichtig.
            </p>
            <img src='/img/jf/IMG_0679.png' className='w-1/2 h-auto object-cover mb-4 rounded-bl-2xl rounded-tl-2xl'/>
          </div>
          <div className='w-full h-fit flex flex-row'>
            <img src='/img/jf/IMG_0696.png' className='w-1/2 h-auto object-cover mb-4 rounded-tr-2xl'/>
            <div className='w-1/2 p-4 text-[25px] flex items-center justify-center'>
              <p>
                Natürlich solltest du auch Interesse an der Feuerwehrarbeit und ehrenamtliches Engagement mitbringen und mindestens 10 Jahre alt sein.
                Wir treffen uns jeden Donnerstag (außerhalb der Ferien) um 18.00 Uhr am Gerätehaus Rödingen.
                Für weitere Fragen nutzt gerne unser
                <a href='/impressum/kontakt' className='text-ral-3000 px-2'>Kontaktformular</a>
                oder unsere
                <a href='https://www.facebook.com/FreiwilligeFeuerwehrTitzLGRoedingen/' className='text-ral-3000 px-2'>Facebookseite</a>.
              </p>
            </div>
          </div>

        </div>
      </BrowserView>
      <MobileView>
        <div className='h-full w-full overflow-scroll flex flex-col items-center px-2'>
          <h1 className='text-ral-3000 underline text-2xl my-2'>
            Eine wirklich starke Truppe
          </h1>
          <img src='/img/jf/IMG_0707.png' className='w-fit object-cover'/>
          <p className='w-full p-4 text-md flex'>
            Die Jugendfeuerwehr stellt die Zukunft der Feuerwehr sicher.
            Dazu werden spielerisch die Grundlagen der feuerwehrtechnischen Ausbildung vermittelt.
            Zudem nimmt die Jugendfeuerwehr wichtige Aufgaben im Bereich der allgemeinen Jugendarbeit wahr,
            wo sie durch verschiedenste Freizeitmaßnahmen bei der Betreuung von Kindern und Jugendlichen mitwirkt.
            Unsere Jugendfeuerwehr besteht aus rund 40 Jugendlichen im Alter von 10 bis 18 Jahren.
            An den Dienstabenden stehen 2 Betreuer der aktiven Wehr mit Rat und Tat zur Seite.
          </p>
          <img src='/img/jf/IMG_0679.png'/>
          <p className='w-full p-4 text-md'>
            Die feuerwehrtechnische Ausbildung wird in Wettbewerben mit anderen Jugendfeuerwehren gemessen.
            Natürlich führen wir auch andere Aktivitäten wie Volleyball, Fußball oder Bowling durch.
            Jährliche Tradition ist unter anderem unser  Sommerzeltlager (alle 2 Jahre) , Weihnachtsfeier und Jahresabschlussübung.
            Außerdem üben wir auch mit anderen Jugendfeuerwehren gemeinsam.
            Wir freuen uns immer über weitere Jugendliche, die Lust haben bei uns mitzumachen.
            Für uns sind Kameradschaft und Teamgeist sehr wichtig.
          </p>
          <img src='/img/jf/IMG_0696.png'/>
          <p className='w-full p-4 text-md'>
            Natürlich solltest du auch Interesse an der Feuerwehrarbeit und ehrenamtliches Engagement mitbringen und mindestens 10 Jahre alt sein.
            Wir treffen uns jeden Donnerstag (außerhalb der Ferien) um 18.00 Uhr am Gerätehaus Rödingen.
            Für weitere Fragen nutzt gerne unser <br/>
            <a href='/impressum/kontakt' className='text-ral-3000 px-2 text-xl'>Kontaktformular</a> <br/>
            oder unsere <br/>
            <a href='https://www.facebook.com/FreiwilligeFeuerwehrTitzLGRoedingen/' className='text-ral-3000 px-2 text-xl'>Facebookseite</a>
          </p>
        </div>
      </MobileView>
    </div>
  )
}
