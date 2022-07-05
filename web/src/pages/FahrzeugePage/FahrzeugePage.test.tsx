import { render } from '@redwoodjs/testing/web'

import FahrzeugePage from './FahrzeugePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FahrzeugePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FahrzeugePage />)
    }).not.toThrow()
  })
})
