import React, { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { Login } from './login'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root') as HTMLElement;

  hydrateRoot(root, createElement(Login));
});
