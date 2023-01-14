import React, { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'

import Login from './login.js'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root') as HTMLElement;

  hydrateRoot(root, createElement(Login));
});
