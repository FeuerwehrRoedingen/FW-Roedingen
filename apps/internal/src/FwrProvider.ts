import { Awaitable, User } from "next-auth";
import type { OAuthConfig, Provider } from "next-auth/providers";
import { AuthSystemFields } from '../../api/pocketbase/pocketbase-types'

const FWRProvider: OAuthConfig<AuthSystemFields> = {
  id: 'feuerwehr-roedingen',
  name: 'Feuerwehr-Roedingen',
  type: 'oauth',
  authorization: '',
  token: '',
  userinfo: '',
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