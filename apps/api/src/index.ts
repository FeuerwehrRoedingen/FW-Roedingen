import { NestFactory } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'


async function createNestServer(): Promise<INestApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  return app
}

createNestServer()
	.then((app) => {
		app.listen(3000);
		console.log('Nest ready');
	})
	.catch((err) => {
		console.error('Nest initialization failed', err);
	});
