
export const hostname = process.env.NODE_ENV === 'production' ? 'management.feuerwehr-roedingen.de' : '127.0.0.1';

export const wsProtocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws';
export const httpProtocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
