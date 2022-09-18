import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  console.log(`listening to Port ${port}`)
  await app.listen(port);
}
bootstrap();
