import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { Graphql } from './graphql/graphql';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ANALYTICS_HOST,
          port: parseInt(process.env.ANALYTICS_PORT, 10),
        }
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST,
          port: parseInt(process.env.AUTH_PORT, 10),
        }
      },
      {
        name: 'GRAPHQL_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.GRAPHQL_HOST,
          port: parseInt(process.env.GRAPHQL_PORT, 10),
        }
      },
      {
        name: 'MESSAGING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MESSAGING_HOST,
          port: parseInt(process.env.MESSAGING_PORT, 10),
        }
      },
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.NOTIFICATIONS_HOST,
          port: parseInt(process.env.NOTIFICATIONS_PORT, 10),
        }
      },
      {
        name: 'REST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.REST_HOST,
          port: parseInt(process.env.REST_PORT, 10),
        }
      }
    ]),
    GraphqlModule
  ],
  controllers: [AppController],
  providers: [AppService, Graphql],
})
export class AppModule {}
