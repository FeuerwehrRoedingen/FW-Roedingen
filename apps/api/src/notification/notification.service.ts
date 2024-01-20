import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class NotificationService {
  constructor(
    private readonly databaseService: DatabaseService
  ){}

  async sendNotification() {
    
  }

  async register(token: string, userId: string) {
    const user = await this.databaseService.getUser(userId);
    if(!user) 
      await this.databaseService.createUser(userId);

    return this.databaseService.createToken({token, userId});
  }
}
