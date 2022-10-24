import { dirname } from 'path'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {} from 'react-router-dom'
import { fileURLToPath } from 'url'

import './index.css'

global.__filename = function():string{
  return fileURLToPath(import.meta.url);
}()

global.__dirname = function():string{
  return dirname(__filename);
}()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

  </React.StrictMode>
)
