import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import serverless from 'serverless-http'

import { AppModule } from './src/app.module'

const expressApp = express();

const app = await NestFactory.create(
	AppModule,
	new ExpressAdapter(expressApp)
);

const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.TCP,
  options: {
    port: 3001,
  },
});

await app.init();
await app.startAllMicroservices();

export const handler = serverless(expressApp);
