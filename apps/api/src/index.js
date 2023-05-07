import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
async function createNestServer() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    return app;
}
createNestServer()
    .then((app) => {
    app.listen(3000);
    console.log('Nest ready');
})
    .catch((err) => {
    console.error('Nest initialization failed', err);
});
