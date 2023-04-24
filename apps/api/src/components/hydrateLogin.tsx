import React from 'react'
import { hydrateRoot } from 'react-dom/client'

import { Login } from './login'

const root = document.getElementById('root') as HTMLElement;

hydrateRoot(root, <Login />);
