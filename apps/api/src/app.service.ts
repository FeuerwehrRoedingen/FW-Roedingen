import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService{

  getHello(): string {
    return 'Hello World!';
  }

  getGraphql(req: Request): string{
    return '';
  }

  getRest(req: Request): string{
    return '';
  }
}
