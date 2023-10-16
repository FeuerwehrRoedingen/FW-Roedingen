
import { createEnv } from "@t3-oss/env-core"
import z from 'zod'

export const env = createEnv({
  server: {
    AUTH0_SECRET:          z.string(),
    AUTH0_BASE_URL:        z.string().url(),
    AUTH0_ISSUER_BASE_URL: z.string().url(),
    AUTH0_CLIENT_ID:       z.string(),
    AUTH0_CLIENT_SECRET:   z.string(),
  },

  clientPrefix: 'NEXT_PUBLIC_',
  client: {

  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
