import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const PORT = process.env.PORT || 3024;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    console.log(`API listening on port ${PORT}`);
    console.log(`Access over http://localhost:${PORT}`);
  })
  
