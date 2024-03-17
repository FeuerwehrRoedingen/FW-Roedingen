import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    AUTH0_SECRET:          z.string(),
    AUTH0_BASE_URL:        z.string().url(),
    AUTH0_ISSUER_BASE_URL: z.string().url(),
    AUTH0_CLIENT_ID:       z.string(),
    AUTH0_CLIENT_SECRET:   z.string(),
    AUTH0_AUDIENCE:        z.string().url(),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_MONITOR_URL:      z.string().url(),
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
    NEXT_PUBLIC_VAPID_KEY:        z.string(),
    NEXT_PUBLIC_HIGHLIGHT_ID:     z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
