import { Router, Route, Set } from '@redwoodjs/router'
import PageLayout from 'src/layouts/PageLayout/PageLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PageLayout}>
        <Route path="/einsaetze" page={EinsaetzePage} name="einsaetze" />
        <Route path="/uebungsdienst" page={UebungsdienstPage} name="uebungsdienst" />
        <Route path="/fahrzeuge" page={FahrzeugePage} name="fahrzeuge" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Route path="/internal" page={InternalPage} name="internal" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
