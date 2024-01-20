import { config } from "dotenv"
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const runtimeEnv = config().parsed;

export const env = createEnv({
  server: {
    AUTH0_ISSUER_URL:      z.string().url(),
    AUTH0_AUDIENCE:        z.string().url(),

    AUTH0_ACCESS_AUDIENCE: z.string().url(),
    AUTH0_CLIENT_ID:       z.string(),
    AUTH0_CLIENT_SECRET:   z.string(),

    FIREBASE_PROJECT_ID:   z.string(),
    FIREBASE_CLIENT_EMAIL: z.string().email(),
    FIREBASE_PRIVATE_KEY:  z.string(),

    HIGHLIGHT_PROJECT_ID:  z.string(),

    TEST_USER_ID:          z.string(),

    DATABASE_URL:          z.string().url(),
    DIRECT_URL:            z.string().url(),
    PORT:                  z.string().default("3000"),
  },
  clientPrefix: "PUBLIC_",
  client: {

  },
  runtimeEnv,
  emptyStringAsUndefined: true,
});
