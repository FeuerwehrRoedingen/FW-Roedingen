//---------------------------------------------------------------
import fetch from  'cross-fetch'        
import Eventsource from 'eventsource'
//@ts-ignore
global.EventSource = Eventsource;
global.fetch = fetch;
//---------------------------------------------------------------

import PocketBase, { Record } from 'pocketbase'

const client = new PocketBase('http://127.0.0.1:8090');

export async function authenticateUser(username: string, password:string){
  const data = await client.users.authViaEmail(username, password);
  return Promise.resolve(data);
}

export async function authenticateAdmin(username: string, password: string){
  const data = await client.admins.authViaEmail(username, password);
  return Promise.resolve(data);
}

export async function getHostFromName(name: string): Promise<string>{
  return new Promise<string>(async (resolve, reject)=>{
    const res = await client.records.getList('hosts', 1, 30);
  
    res.items.forEach(elem => {
      if(elem.name === name){
        resolve(elem.host);
      }
    })
    reject();
  })
}
export async function getHost(name:string): Promise<string|undefined> {
  return new Promise(async (resolve, reject) => {
    try{
      const res = (await client.records.getList('hosts', 1, 30)).items as any[];
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
      const res = (await client.records.getList('hosts', 1, 30)).items as any[];
      const ret: string[] = res.map(elem => elem.name);
      resolve(ret)
    }
    catch(error){
      console.error(error);
    }
  })
}
