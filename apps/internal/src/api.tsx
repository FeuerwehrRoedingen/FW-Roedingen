
const isDev = process.env.NODE_ENV !== 'production';



export const API = isDev ? 
  'http://localhost:3025':
  'https://api.feuerwehr-roedingen.de';

export const WS_API = isDev ?
  'ws://localhost:3025':
  'wss://api.feuerwehr-roedingen.de';