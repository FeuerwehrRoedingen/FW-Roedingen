import type { OAuthConfig } from "next-auth/providers";
import type { AuthSystemFields } from './pocketbase-types'

import { API } from './api.js'

declare module 'next-auth'{
  interface User {
    id: string;
    created: string;
    updated: string;
    email: string;
    verified: boolean;
    lastResetSentAt: string;
    lastVerificationSentAt: string;
    profile: Object;
  }
  interface Session {
    user: User
  }
}

export const FWRProvider: OAuthConfig<AuthSystemFields> = {
  id: 'feuerwehr-roedingen',
  name: 'Feuerwehr-Roedingen',
  type: 'oauth',
  authorization: API+'/oauth/authorize',
  token: API+'/oauth/token',
  userinfo: API+'/oauth/userinfo',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  profile(profile){
    return new Promise((resolve) => {
      resolve({
        id: profile.id,
        name: profile.username,
        email: profile.email,
        image: profile.username,
        created: profile.created,
        updated: profile.updated,
        verified: profile.verified,
        lastResetSentAt: '',
        lastVerificationSentAt: '',
        profile
      })
    })
  }
}
