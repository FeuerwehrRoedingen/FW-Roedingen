import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class NotificationService {
  constructor(
    private readonly databaseService: DatabaseService
  ){}

  async sendNotification() {
    
  }

  async register(token: string, userId: number) {
    const user = await this.databaseService.getUser(userId);
    if(!user) 
      await this.databaseService.createUser({id: userId});

    return this.databaseService.createToken({token, userId});
  }
}
