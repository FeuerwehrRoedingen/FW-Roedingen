import React, { Component } from 'react'
import HomeButton from '../../components/HomeButton'

type Props = {}
type State = {}

export default class Datenschutz extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className='bg-gray-900 text-silver h-screen text-xs  pl-2 pt-2'>
        <HomeButton />
        <div className='max-w-[1000px]'>
          <h2 className='text-lg border-b-2 border-b-ral-3020 mt-2'>Datenschutz</h2>
          <div className='pl-2'>
            Nachfolgend möchten wir Sie über unsere Datenschutzerklärung informieren. Sie finden hier Informationen 
            über die Erhebung und Verwendung persönlicher Daten bei der Nutzung unserer Webseite. Wir beachten dabei 
            das für Deutschland geltende Datenschutzrecht. Sie können diese Erklärung jederzeit auf unserer Webseite abrufen.
            Wir weisen ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) 
            Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann. 
            Die Verwendung der Kontaktdaten unseres Impressums zur gewerblichen Werbung ist ausdrücklich nicht erwünscht, 
            es sei denn wir hatten zuvor unsere schriftliche Einwilligung erteilt oder es besteht bereits eine Geschäftsbeziehung.
            Der Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung 
            und Weitergabe ihrer Daten. 
          </div>
          <h2 className='text-lg border-b-2 border-b-ral-3020 mt-2'>Personenbezogene Daten</h2> 
          <div className='pl-2'>
            Sie können unsere Webseite ohne Angabe personenbezogener Daten besuchen. Soweit auf unseren Seiten personenbezogene 
            Daten (wie Name, Anschrift oder E-Mail Adresse) erhoben werden, erfolgt dies, soweit möglich, auf freiwilliger Basis.
            Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Sofern zwischen Ihnen und uns 
            ein Vertragsverhältnis begründet, inhaltlich ausgestaltet oder geändert werden soll oder Sie an uns eine Anfrage 
            stellen, erheben und verwenden wir personenbezogene Daten von Ihnen, soweit dies zu diesen Zwecken erforderlich ist
            (Bestandsdaten). Wir erheben, verarbeiten und nutzen personenbezogene Daten soweit dies erforderlich ist, um Ihnen 
            die Inanspruchnahme des Webangebots zu ermöglichen (Nutzungsdaten). Sämtliche personenbezogenen Daten werden nur 
            solange gespeichert wie dies für den genannten Zweck (Bearbeitung Ihrer Anfrage oder Abwicklung eines Vertrags) 
            erforderlich ist. Hierbei werden steuer- und handelsrechtliche Aufbewahrungsfristen berücksichtigt. Auf Anordnung 
            der zuständigen Stellen dürfen wir im Einzelfall Auskunft über diese Daten (Bestandsdaten) erteilen, soweit dies 
            für Zwecke der Strafverfolgung, zur Gefahrenabwehr, zur Erfüllung der gesetzlichen Aufgaben der 
            Verfassungsschutzbehörden oder des Militärischen Abschirmdienstes oder zur Durchsetzung der Rechte am geistigen 
            Eigentum erforderlich ist.
          </div>
          <h2 className='text-lg border-b-2 border-b-ral-3020 mt-2'>Auskunftsrecht</h2>
          <div className='pl-2'>
            Sie haben das jederzeitige Recht, sich unentgeltlich und unverzüglich über die zu Ihrer Person erhobenen Daten 
            zu erkundigen. Sie haben das jederzeitige Recht, Ihre Zustimmung zur Verwendung Ihrer angegeben persönlichen Daten 
            mit Wirkung für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden Sie sich bitte an den Anbieter unter den 
            Kontaktdaten im Impressum.
          </div>
          <a href='https://www.juraforum.de/impressum-generator/'>
            Quelle: juraform.de
          </a>
        </div>
      </div>
    )
  }
}