import { Injectable } from '@nestjs/common'
import { PrismaClient, Token, User } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class DatabaseService extends PrismaClient{
  constructor() {
    super();
    this.$connect();
    this.$extends(withAccelerate());
  }

  //------------------------------------------------
  // Getter
  //------------------------------------------------
  get getAllUsers(){
    return this.user.findMany();
  }
  async getUser(id: string){
    return this.user.findUnique({
      where: {
        id
      }
    });
  }
  async getTokens(userId: string){
    return this.token.findMany({
      where: {
        userId
      }
    });
  }
  async getQuestion(level: number){
    const count = await this.question.count();
    const skip = Math.floor(Math.random() * count);
    return this.question.findMany({
      where: {
        level: {
          level: {
            lte: level
          }
        }
      },
      include: {
        level: true
      },
      skip
    });
  }

  //------------------------------------------------
  // Setter
  //------------------------------------------------
  async createUser(uid: string){
    return this.user.create({
      data: {
        id: uid
      }
    });
  }
  async createToken(data: Token){
    return this.token.create({
      data
    });
  }
  
  //------------------------------------------------
  // Deleter
  //------------------------------------------------
  async deleteUser(id: string){
    this.user.delete({
      where: {
        id
      }
    });
  }
  async deleteToken(token: string){
    this.token.delete({
      where: {
        token
      }
    });
  }
}
