import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { type Session } from '@prisma/client';
import { type Request } from 'express';

import { LeitstelleService } from './leitstelle.service';

@Controller('leitstelle')
export class LeitstelleController {

  constructor(
    private readonly leitstelleService: LeitstelleService
  ) {}

  @Post('session')
  createSession(@Req() request: Request, @Body() session: Omit<Session, "id">) {
    return this.leitstelleService.createSession(session, request.user.sub);
  }

  @Get('session/:sid')
  getSession(@Param('sid') sid: string) {
    return this.leitstelleService.getSession(sid);
  }
  @Post('session/:sid')
  joinSession(@Req() request: Request, @Param('sid') sid: string, @Body() { password }: { password: string }) {
    return this.leitstelleService.joinSession(sid, password, request.user.sub);
  }
  @Delete('session/:sid')
  leaveSession(@Req() request: Request, @Param('sid') sid: string) {
    return this.leitstelleService.leaveSession(sid, request.user.sub);
  }
}
