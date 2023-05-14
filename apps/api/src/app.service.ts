import { Inject, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AppService implements OnApplicationBootstrap, OnApplicationShutdown {

  constructor(
    @Inject('GRAPHQL_SERVICE') private readonly graphqlService: ClientProxy,
    @Inject('REST_SERVICE') private readonly restService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.graphqlService.connect();
    await this.restService.connect();
  }
  async onApplicationShutdown(signal?: string | undefined) {
    await this.graphqlService.close();
    await this.restService.close();
  }

  getHello(): string {
    return 'Hello World!';
  }

  getGraphql(req: Request): Observable<string> {
    return this.graphqlService.send<string>('handle', req);
  }

  getRest(req: Request): Observable<string> {
    return this.restService.send<string>('handle', req);
  }
}
