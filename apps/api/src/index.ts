import { User } from '@prisma/client-api'
import express from 'express'
import session from 'express-session'
import { createServer } from 'http'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import router from './routes.js'

import { config } from 'dotenv'
config();

global.__filename = function():string{
  return fileURLToPath(import.meta.url);
}()

global.__dirname = function():string{
  return dirname(__filename);
}()

// Editing Session Object
declare module "express-session" {
  interface SessionData {
    user: Omit<User, 'password'>
  }
}

const sessionParser = session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET!,
  resave: false
});

export const express_server = express();
export const http_server = createServer(express_server);

express_server.use(router);
express_server.use(express.static(join(__dirname, 'public')));
express_server.use(sessionParser);
