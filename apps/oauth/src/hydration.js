import { createElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Page from '%%filename';

const root = document.getElementById('root');
if(root === null){
  alert('hydration failed because root div could not be found');
} else {
  hydrateRoot(root, createElement(Page));
}
