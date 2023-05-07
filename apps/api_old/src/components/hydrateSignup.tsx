import React from 'react'
import { hydrateRoot } from 'react-dom/client'

import { SignUp } from './signUp'

const root = document.getElementById('root') as HTMLElement;

hydrateRoot(root, <SignUp />);
