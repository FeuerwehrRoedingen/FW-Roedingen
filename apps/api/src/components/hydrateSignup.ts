import React, { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { SignUp } from './signUp'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root') as HTMLElement;

  hydrateRoot(root, createElement(SignUp));
});
