import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @Post()
  postNotification(){
    return this.notificationService.sendNotification();
  }

  @Post('register')
  postRegister(@Req() req: Request, @Body() body: any){

    console.log(req);
    console.log(body);

    return this.notificationService.register();
  }
}
