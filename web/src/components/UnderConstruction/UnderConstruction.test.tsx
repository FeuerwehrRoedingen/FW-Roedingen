import { render } from '@redwoodjs/testing/web'

import UnderConstruction from './UnderConstruction'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UnderConstruction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UnderConstruction />)
    }).not.toThrow()
  })
})
