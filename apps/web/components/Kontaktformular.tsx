import React from 'react'

type Props = {}

export default function Kontaktformular(props: Props) {
  return (
    <div style={{marginLeft: '10px', height: 'fit-content', width: '60vw'}}>
      <form action="" method="POST">
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <label htmlFor="prename">Vorname</label>
              <input type="text" name="prename" id="prename"/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <label htmlFor="lastname">Nachname</label>
              <input type="text" name="lastname" id="lastname"/>
            </div>
          </div>
          <label htmlFor="email">Kontakt Email</label>
          <input type="email" name="email" id="email"/>
          <textarea name="message" id="message" cols={30} rows={10} />
          <button type="submit">Senden</button>
        </div>
      </form>
    </div>
  )
}