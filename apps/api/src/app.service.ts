import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'under construction';
  }
  getHello(): string {
    return 'Hello World'
  }
}