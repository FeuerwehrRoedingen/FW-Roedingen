//---------------------------------------------------------------
import fetch from  'cross-fetch'        
import Eventsource from 'eventsource'
//@ts-ignore
global.EventSource = Eventsource;
global.fetch = fetch;
//---------------------------------------------------------------

import PocketBase, { Record, RecordAuthResponse } from 'pocketbase'

const client = new PocketBase('http://127.0.0.1:8090');

export async function authenticateUser(username: string, password:string): Promise<RecordAuthResponse<Record>>{
  const data = await client.collection('users').authWithPassword(username, password);
  return Promise.resolve(data);
}

export async function getHost(name:string): Promise<string|undefined> {
  return new Promise(async (resolve, reject) => {
    try{
      const res = await client.collection('hosts').getFullList();
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
      const res = await client.collection('hosts').getFullList();
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

export async function getFahrzeug(): Promise<string> {
  return new Promise<string>(async (resolve) => {
    
  })
}