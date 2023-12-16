import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { type ChildProcess, spawn } from "child_process";

type IOPtions = {
  port: number|undefined;
  browser: boolean|undefined;
  hostname: string|undefined;
}

@Injectable()
export class PrismaStudioService implements OnApplicationBootstrap, OnApplicationShutdown{
  #prismaStudioProcess: ChildProcess;

  async start(options: IOPtions) {

    const port = options.port ? ['--port', options.port.toString()] : [];
    const browser = options.browser ? [] : ['--browser', 'none'];
    const hostname = options.hostname ? ['--host', options.hostname] : [];

    this.#prismaStudioProcess = spawn('npx', ['prisma', 'studio', ...port, ...browser, ...hostname], {
      stdio: 'inherit'
    });

    process.on('SIGINT', () => {
      this.#prismaStudioProcess.kill();
    });
  }

  async onApplicationBootstrap() {
    await this.start({
      port: 5555,
      browser: false,
      hostname: 'localhost'
    });
  }

  async onApplicationShutdown() {
    this.#prismaStudioProcess.kill();
  }
}
