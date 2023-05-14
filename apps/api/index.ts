import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import serverless from 'serverless-http'

import { AppModule } from './src/app.module'

//add variable to global enviroment type
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ANALYTICS_HOST: string
      readonly ANALYTICS_PORT: string

      readonly AUTH_HOST: string
      readonly AUTH_PORT: string

      readonly GRAPHQL_HOST: string
      readonly GRAPHQL_PORT: string
      
      readonly MESSAGING_HOST: string
      readonly MESSAGING_PORT: string
      
      readonly NOTIFICATIONS_HOST: string
      readonly NOTIFICATIONS_PORT: string
      
      readonly REST_HOST: string
      readonly REST_PORT: string
    }
  }
}

const expressApp = express();

const app = await NestFactory.create(
	AppModule,
	new ExpressAdapter(expressApp)
);


await app.init();

export const handler = serverless(expressApp);
