import { PrismaClient } from '@prisma/client'

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