import { render } from '@redwoodjs/testing/web'

import EinsaetzePage from './EinsaetzePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EinsaetzePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EinsaetzePage />)
    }).not.toThrow()
  })
})
