import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './components/App'

export function render(context) {
  return ReactDOMServer.renderToString(React.createElement(App))
}
