import type { OAuthConfig } from "next-auth/providers";
import type { AuthSystemFields } from '../../api/pocketbase/pocketbase-types'

import { API } from './api'

const FWRProvider: OAuthConfig<AuthSystemFields> = {
  id: 'feuerwehr-roedingen',
  name: 'Feuerwehr-Roedingen',
  type: 'oauth',
  authorization: API+'/oauth/authorize',
  token: API+'/oauth/access_token',
  userinfo: API+'/oauth/userinfo',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  profile(profile){
    return new Promise((resolve, reject) => {
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

export default FWRProvider;
