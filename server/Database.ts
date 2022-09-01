import { Prisma, PrismaClient } from '@prisma/client'
import { User } from './prisma/types';

export default class Database{
  prisma?: PrismaClient;

  private constructor(){
  }

  async connect(){
    if(!this.prisma){
      this.prisma = new PrismaClient();
    }
    await this.prisma.$connect();
    return Promise.resolve();
  }

  async close(){
    await this.prisma!.$disconnect();
    return Promise.resolve();
  }
}

export async function getUser(username: string){
  return new Promise<User|null>(async function(){
    
  })
}