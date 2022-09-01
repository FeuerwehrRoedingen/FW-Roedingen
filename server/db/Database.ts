import { PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client';

export const database = new PrismaClient();

export async function connect(){
  return database.$connect();
}

export async function getUser(username: string){
  return new Promise<User|null>(async function(){
    
  })
}