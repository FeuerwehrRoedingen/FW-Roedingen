import { NestFactory } from '@nestjs/core'
import { HighlightInterceptor, HighlightLogger } from '@highlight-run/nest'
import { exec } from 'child_process'
import * as proxy from 'express-http-proxy'

import { env } from './env'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/studio', proxy('localhost:5555', {
    proxyReqPathResolver: () => '/studio'
  }))

  const gitSha = await getGitSha();
  const highlightConfig = {
    projectID: env.HIGHLIGHT_PROJECT_ID,
    serviceName: 'fwr api',
    serviceVersion: gitSha
  }

  app.useGlobalInterceptors(new HighlightInterceptor(highlightConfig));
  app.useLogger(new HighlightLogger(highlightConfig));

  await app.listen(env.PORT);
}
bootstrap()
  .then(() => {
    console.log(`API listening on port ${env.PORT}`);
    console.log(`Access over http://localhost:${env.PORT}`);
  })
  .catch(err => {
    console.error('Error while Bootstrapping App!\n', err);
    process.exit(1);
  });

async function getGitSha(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('git rev-parse HEAD', (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}
