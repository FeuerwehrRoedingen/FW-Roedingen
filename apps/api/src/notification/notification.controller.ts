import { Body, Controller, Get, InternalServerErrorException, Post, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';

import { Admin } from '../auth/auth.decorator';

import type { Request } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @Admin()
  @Post()
  postNotification(@Body() body: any){

    console.log(body);

    try {

      //TODO validate body

      return this.notificationService.sendNotification();
    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('register')
  postRegister(@Req() req: Request){

    const body = req.body

    console.log(req.user);
    console.log(body);

    //TODO validate body

    try {

    }
    catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
