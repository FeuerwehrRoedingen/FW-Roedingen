import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const UebungsdienstPage = () => {
  return (
    <>
      <MetaTags title="Uebungsdienst" description="Uebungsdienst page" />

      <h1>UebungsdienstPage</h1>
      <p>
        Find me in <code>./web/src/pages/UebungsdienstPage/UebungsdienstPage.tsx</code>
      </p>
      <p>
        My default route is named <code>uebungsdienst</code>, link to me with `
        <Link to={routes.uebungsdienst()}>Uebungsdienst</Link>`
      </p>
    </>
  )
}

export default UebungsdienstPage
