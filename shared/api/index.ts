
export const isDev = process.env.NODE_ENV !== 'production';

export const API = isDev ? 
  'http://localhost:3025':
  'https://api.feuerwehr-roedingen.de';

  export const DOOR = isDev ? 
  'http://localhost:3024':
  'https://door.feuerwehr-roedingen.de';

export const WS_API = isDev ?
  'ws://localhost:3025':
  'wss://api.feuerwehr-roedingen.de';

export async function API_Alive(): Promise<boolean>{
  return new Promise<boolean>(async (resolve) => {
    fetch(`${API}/public/status`)
      .then(
        res => resolve(res.ok),
        reason => {
          resolve(false);
        }
      )
      .catch(error => {
        resolve(false);
      })
  })
}
