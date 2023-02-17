//---------------------------------------------------------------
import fetch from 'cross-fetch'
import Eventsource from 'eventsource'
//@ts-ignore
global.EventSource = Eventsource;
global.fetch = fetch;
//---------------------------------------------------------------

import PocketBase, { Record, RecordAuthResponse } from 'pocketbase'
import { spawn } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { AuthRequestRecord, AuthRequestResponse, Collections, TokenResponse } from 'fw-roedingen-shared'

const __dirname = dirname(fileURLToPath(import.meta.url));

export const client = new PocketBase('http://127.0.0.1:8090');

export async function startPB(stdin = process.stdin, stdout = process.stdout, stderr = process.stderr){
  return spawn('go', ['run', 'main.go', 'serve'], { stdio: [stdin, stdout, stderr], cwd: __dirname});
}

export async function authenticateUser(username: string, password: string): Promise<RecordAuthResponse<Record>> {
  const data = await client.collection(Collections.Users).authWithPassword(username, password);
  return Promise.resolve(data);
} 

export async function getHost(name: string): Promise<string | undefined> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await client.collection(Collections.Users).getFullList().catch(e => { throw new Error(e) });
      res.forEach(elem => {
        if (elem.name === name) {
          return resolve(elem.host);
        }
      })
      reject();
    }
    catch (error) {
      console.error(error);
    }
  })
}
export async function getHosts(): Promise<string[]> {
  return new Promise<string[]>(async (resolve) => {
    try {
      const res = await client.collection(Collections.Users).getFullList().catch(e => { throw new Error(e) });
      const ret: string[] = res.map(elem => elem.name);
      resolve(ret)
    }
    catch (error) {
      console.error(error);
      resolve([])
    }
  })
}

export async function getFahrzeuge(): Promise<string[]> {
  return new Promise<string[]>(async (resolve) => {
    try {

    }
    catch (error) {
      console.error(error);
      resolve([])
    }
  })
}

export async function getFahrzeug(name: string): Promise<string> {
  return new Promise<string>(async (resolve) => {
    try {
      name;
    }
    catch (error) {
      console.error(error);
      resolve('');
    }
  })
}
