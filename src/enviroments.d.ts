import { PrismaClient } from "@prisma/client";

declare global{
  namespace NodeJS{
    interface ProcessEnv{

    }
  }
  readonly var database: PrismaClient;
}