import React, { Component } from 'react'
import HomeButton from '../../components/HomeButton'

type Props = {}
type State = {}

export default class Impressum extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className='bg-gray-900 h-screen text-silver text-xs pl-4 pt-4'>
        <HomeButton/>
        <div className='max-w-[1000px]'>
          <h1 className='text-3xl border-b-2 border-b-ral-3020'>Impressum</h1>
          <div className='pl-2'>
            Thomas Lessenich<br/>
            Platz 10<br/>
            52445 Titz<br/>
            Telefon: 02463-8168<br/>
            E-Mail: info@feuerwehr-roedingen.de
          </div>
          <h1 className='text-xl border-b-2 border-b-ral-3020'>Verantwortlich für den Inhalt (gem. § 55 Abs. 2 RStV):</h1>
          <div className='pl-2'>
            Thomas Lessenich<br/>
            Platz 10<br/>
            52445 Titz<br/>
          </div>
          <h1 className='text-xl border-b-2 border-b-ral-3020'>Disclaimer – rechtliche Hinweise</h1>
          <h2 className='text-lg'>§ 1 Warnhinweis zu Inhalten</h2>
          <div className='pl-2'>
            Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. 
            Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten 
            kostenlosen und frei zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge 
            geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch den Aufruf 
            der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem 
            Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des Anbieters.
          </div>
          <h2 className='text-lg'>§ 2 Externe Links</h2>
          <div className='pl-2'>
            Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der 
            Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die 
            fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine 
            Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung 
            und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der 
            Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der 
            externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis 
            von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
          </div>
          <h2 className='text-lg'>§ 3 Urheber- und Leistungsschutzrechte</h2>
          <div className='pl-2'>
            Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht.
            Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen 
            schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung,
            Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen 
            elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet. 
            Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und 
            strafbar. Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen 
            Gebrauch ist erlaubt. Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
          </div>
          <h2 className='text-lg'>§ 4 Besondere Nutzungsbedingungen</h2>
          <div className='pl-2'>
            Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Paragraphen abweichen,
            wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall 
            die besonderen Nutzungsbedingungen. <br/><br/>
          </div>
          <a href='https://www.juraforum.de/impressum-generator/'>
            Quelle: Impressum Vorlage von JuraForum.de
          </a>
        </div>
      </div>
    )
  }
}