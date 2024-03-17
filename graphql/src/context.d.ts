// datasources
import { AppAPI } from 'dataSources/app.ts'

export type FWR_Context = {
    auth: FWR_Auth;
    datasources: {
        authAPI: AuthAPI
        authAPI: AuthAPI
        authAPI: AuthAPI
        userAPI: UserAPI
        userAPI: UserAPI
        userAPI: UserAPI
        userAPI: UserAPI
        userAPI: UserAPI
        userAPI: UserAPI
        userAPI: UserAPI
        appAPI: AppAPI
    }
}

export type FWR_Auth = {
    type: 'jwt'
    jwt: string;
} | {
    type: 'pat'
    pat: string;
} | {
    type: 'oat'
    oat: string;
}
