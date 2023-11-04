import { NestFactory } from '@nestjs/core'

import { env } from './env'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(env.PORT);
}
bootstrap()
  .then(() => {
    console.log(`API listening on port ${env.PORT}`);
    console.log(`Access over http://localhost:${env.PORT}`);
  })
  
