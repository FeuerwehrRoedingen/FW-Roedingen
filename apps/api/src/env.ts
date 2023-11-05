import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"
import { config } from "dotenv"

const runtimeEnv = config().parsed;

export const env = createEnv({
  server: {
    AUTH0_ISSUER_URL:      z.string().url(),
    AUTH0_AUDIENCE:        z.string().url(),

    AUTH0_ACCESS_AUDIENCE: z.string().url(),
    AUTH0_CLIENT_ID:       z.string(),
    AUTH0_CLIENT_SECRET:   z.string(),

    DATABASE_URL:          z.string().url(),
    PORT:                  z.string().default("3000"),
  },
  clientPrefix: "PUBLIC_",
  client: {

  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
