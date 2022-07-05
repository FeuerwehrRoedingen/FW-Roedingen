import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const EinsaetzePage = () => {
  return (
    <>
      <MetaTags title="Einsaetze" description="Einsaetze page" />

      <h1>EinsaetzePage</h1>
      <p>
        Find me in <code>./web/src/pages/EinsaetzePage/EinsaetzePage.tsx</code>
      </p>
      <p>
        My default route is named <code>einsaetze</code>, link to me with `
        <Link to={routes.einsaetze()}>Einsaetze</Link>`
      </p>
    </>
  )
}

export default EinsaetzePage
