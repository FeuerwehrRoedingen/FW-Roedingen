import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/graphql')
  getGraphql(
    @Req() req: Request,
  ): Observable<string> {
     return this.appService.getGraphql(req);
  }

  @Get('/rest')
  getRest(
    @Req() req: Request,
  ): Observable<string> {
    return this.appService.getRest(req);
  }

}
