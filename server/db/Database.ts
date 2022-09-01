import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client';

export let database: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  database = new PrismaClient();
} else {
  if (!global.database) {
    global.database = new PrismaClient();
  }
  database = global.database;
}


export async function getUser(username: string){
  return new Promise<User|null>(async function(){
    
  })
}