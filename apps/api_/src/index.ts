import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { Server } from 'http';


export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}
export interface QueueMessage {
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/workers/runtime-apis/queue/
	// MY_QUEUE: Queue;
}
export interface CfHostMetadata {
	// Example binding to Cloudflare Host Metadata. Learn more at https://developers.cloudflare.com/workers/runtime-apis/host-metadata/
	// HOST_METADATA: HostMetadata;
}
 
const server = new Server();

const createNestServer = async (httpServer: Server) => {
	const app = await NestFactory.create(
		AppModule,
		new ExpressAdapter(httpServer),
	);

	return app.init();
};

createNestServer(server)
  .then(v => console.log('Nest Ready'))
  .catch(err => console.error('Nest broken', err));

const handler: ExportedHandler<Env, QueueMessage, CfHostMetadata> = {
	async fetch( request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let response = new Response();
		server.emit('request', request, response);
		return response;
	},
  async tail( events: TraceItem[], env: Env, ctx: ExecutionContext): Promise<void> {
		console.log("Tail handler called");
	},
  async trace( events: TraceItem[], env: Env, ctx: ExecutionContext): Promise<void> {
		console.log("Trace handler called");
	},
  async scheduled( controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log("Scheduled handler called");
	},
  async test( controller: TestController, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log("Test handler called");
	},
  async queue( batch: MessageBatch, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log("Queue handler called");
	},
};

export default handler;