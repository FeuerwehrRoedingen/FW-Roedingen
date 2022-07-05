import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FahrzeugePage = () => {
  return (
    <>
      <MetaTags title="Fahrzeuge" description="Fahrzeuge page" />

      <h1>FahrzeugePage</h1>
      <p>
        Find me in <code>./web/src/pages/FahrzeugePage/FahrzeugePage.tsx</code>
      </p>
      <p>
        My default route is named <code>fahrzeuge</code>, link to me with `
        <Link to={routes.fahrzeuge()}>Fahrzeuge</Link>`
      </p>
    </>
  )
}

export default FahrzeugePage
