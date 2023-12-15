
import { APIfetch } from '../api';
import { handleNotFound } from '../handleError';

type Session = {
  id: string;
  players: string[];
  password: string;   // hashed
  map: string;
} 

export async function createSession(session: Omit<Session, "id">) {
  return APIfetch('leistelle/session', { method: 'POST', body: JSON.stringify(session) })
    .then(res => res.json())
}

export async function joinSession(sid: string, password: string): Promise<Session|null>{
  const res = await APIfetch(`leitstelle/session/${sid}`, { method: 'POST', body: JSON.stringify({ password }) });
  if (res.status === 404) 
    handleNotFound();
  return res.json();
}
