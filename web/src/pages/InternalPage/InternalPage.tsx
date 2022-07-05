import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const InternalPage = () => {
  return (
    <>
      <MetaTags title="Internal" description="Internal page" />

      <h1>InternalPage</h1>
      <p>
        Find me in <code>./web/src/pages/InternalPage/InternalPage.tsx</code>
      </p>
      <p>
        My default route is named <code>internal</code>, link to me with `
        <Link to={routes.internal()}>Internal</Link>`
      </p>
    </>
  )
}

export default InternalPage
