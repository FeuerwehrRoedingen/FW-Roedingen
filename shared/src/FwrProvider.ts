import type { OAuthConfig } from "next-auth/providers";
import type { User } from 'next-auth'

import { API } from './api.js'

declare module 'next-auth'{
  interface User {
    email: string,
    emailVerified: boolean,
    displayName: string|undefined,
    photoURL: string|undefined,
    profile: {
      id: string,
      email: string,
      displayName: string,
      creationTime: string,
      lastSignInTime: string | undefined,
      lastRefreshTime: string | undefined,
      phoneNumber: string|undefined,
      tokensValidAfterTime: string,
      tenantId: string|undefined
    }
  }

  interface Session {
    user: User
  }
}

export const FWRProvider: OAuthConfig<User> = {
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
      resolve(profile)
    })
  }
}
