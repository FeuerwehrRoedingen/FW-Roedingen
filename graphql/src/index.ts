#!/usr/bin/env -S node -r ts-node/register --loader ts-node/esm
import { createServer as createHttpServer } from 'node:http';
import fastify from 'fastify'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import responseCachePlugin from '@apollo/server-plugin-response-cache';

import { FWR_Context } from 'context';

const app = fastify({ logger: true });


const resolvers = {};
const typeDefs = require('schema.graphql');
const server = new ApolloServer<FWR_Context>({
    resolvers,
    typeDefs,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
        // authenticationPlugin,
        responseCachePlugin(),
    ],
    status400ForVariableCoercionErrors: true,
    stopOnTerminationSignals: true
});

await server.start();

app.listen({
    port: parseInt(process.env.PORT || "3000"),
    host: process.env.HOST || "localhost",
}, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
});
