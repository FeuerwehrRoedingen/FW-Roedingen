import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

let root = document.getElementById('app');

if(!root){
  console.error('Failed to laod app div from DOM');
} else {
  ReactDOM.hydrateRoot(root, React.createElement(App));
}
