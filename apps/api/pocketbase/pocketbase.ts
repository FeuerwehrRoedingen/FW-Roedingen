//---------------------------------------------------------------
import fetch from  'cross-fetch'        
import Eventsource from 'eventsource'
//@ts-ignore
global.EventSource = Eventsource;
global.fetch = fetch;
//---------------------------------------------------------------

import PocketBase, { Record, RecordAuthResponse } from 'pocketbase'

import { AuthRequestRecord, AuthRequestResponse, Collections } from './pocketbase-types.js'

const client = new PocketBase('http://127.0.0.1:8090');

export async function authenticateUser(username: string, password:string): Promise<RecordAuthResponse<Record>>{
  const data = await client.collection(Collections.Users).authWithPassword(username, password);
  return Promise.resolve(data);
}

export async function getHost(name:string): Promise<string|undefined> {
  return new Promise(async (resolve, reject) => {
    try{
      const res = await client.collection(Collections.Users).getFullList();
      res.forEach(elem => {
        if(elem.name === name){
          return resolve(elem.host);
        }
      })
      reject();
    }
    catch(error){
      console.error(error);
    }
  })
}
export async function getHosts(): Promise<string[]>{
  return new Promise<string[]>(async (resolve) => {
    try{
      const res = await client.collection(Collections.Users).getFullList();
      const ret: string[] = res.map(elem => elem.name);
      resolve(ret)
    }
    catch(error){
      console.error(error);
      resolve([])
    }
  })
}

export async function getFahrzeuge(): Promise<string[]> {
  return new Promise<string[]>(async (resolve) => {
    try{

    }
    catch(error){
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
    catch(error){
      console.error(error);
      resolve('');
    }
  })
}

export async function addCode(username: string, code: string){
  const user = await client.collection(Collections.Users).getFirstListItem(`email="${username}"`);

  const data: AuthRequestRecord = {
    code,
    user: user.id
  };

  try{
    const test = await getAuthRequest(code);
    await client.collection(Collections.AuthRequest).delete(test.id);
  }
  catch(_error){}

  const authRequest = await client.collection(Collections.AuthRequest).create<AuthRequestResponse>(data);

  setTimeout(() => {
    client.collection(Collections.AuthRequest).delete(authRequest.id);
  }, 60_000);

  return Promise.resolve();
}

export async function getAuthRequest(code: string){
  return client.collection(Collections.AuthRequest).getFirstListItem<AuthRequestResponse>(`code="${code}"`)
}

export async function hasCode(code: string){
  try {
    await getAuthRequest(code);
    return true;
  }
  catch(_error){
    return false;
  }
}

export async function addAccessTokenToUser(access_token: string, userId: string) {

  setTimeout(() => {
    client.collection(Collections.Users).update(userId, { access_token: undefined });
  }, 1_800_000);

  return client.collection(Collections.Users).update<AuthRequestResponse>(userId, { access_token });
}

export async function getUserFromToken(access_token: string){
  return client.collection(Collections.Users).getFirstListItem(`access_token="${access_token}"`);
}