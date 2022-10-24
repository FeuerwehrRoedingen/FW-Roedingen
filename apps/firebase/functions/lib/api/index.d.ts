/// <reference types="node" />
import { User } from '@prisma/client-api';
declare module "express-session" {
    interface SessionData {
        user: Omit<User, 'password'>;
    }
}
export declare const express_server: import("express-serve-static-core").Express;
export declare const http_server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
