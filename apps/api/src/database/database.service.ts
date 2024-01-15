import { Injectable } from '@nestjs/common'
import { PrismaClient, Token, User } from '@prisma/client'

@Injectable()
export class DatabaseService extends PrismaClient{
  constructor() {
    super();
    this.$connect();
  }

  //------------------------------------------------
  // Getter
  //------------------------------------------------
  get getAllUsers(){
    return this.user.findMany();
  }
  async getUser(id: number){
    return this.user.findUnique({
      where: {
        id
      }
    });
  }
  async getTokens(userId: number){
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
  async createUser(uid: number){
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
  async deleteUser(id: number){
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
