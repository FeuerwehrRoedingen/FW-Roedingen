import { render } from '@redwoodjs/testing/web'

import UebungsdienstPage from './UebungsdienstPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UebungsdienstPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UebungsdienstPage />)
    }).not.toThrow()
  })
})
