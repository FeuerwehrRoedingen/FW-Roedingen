
import { APIfetch } from '../api';
import { handleNotFound } from '../handleError';

type Session = {
  id: string;
  players: string[];
  password: string;   // hashed
  map: string;
}

export async function createSession(): Promise<Session>{
  const res = await APIfetch('/session', { method: 'POST' });
  return res.json();
}

export async function joinSession(sid: string, password: string): Promise<Session|null>{
  const res = await APIfetch(`/session/${sid}`, { method: 'POST', body: JSON.stringify({ password }) });
  if (res.status === 404) 
    handleNotFound();
  return res.json();
}
