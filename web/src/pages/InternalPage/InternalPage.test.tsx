import { render } from '@redwoodjs/testing/web'

import InternalPage from './InternalPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('InternalPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InternalPage />)
    }).not.toThrow()
  })
})
