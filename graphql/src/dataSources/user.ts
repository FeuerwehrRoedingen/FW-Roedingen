import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest'
import { KeyValueCache } from '@apollo/utils.keyvaluecache'
import { FWR_Auth } from 'context'

export class UserAPI extends RESTDataSource {
    override baseURL = `${process.env.API_URL}/api/v1`
    private authOptions: FWR_Auth;

    constructor(options: { cache: KeyValueCache, context: FWR_Auth }) {
        super(options);
        this.authOptions = options.context;
    }

    willSendRequest(path: string, request: AugmentedRequest) {
        if (process.env.API_URL) {
            request.headers['Host'] = process.env.API_URL;
        }

        if (this.authOptions.type === 'jwt') {
            request.headers['Authorization'] = this.authOptions.jwt;
        }
        if (this.authOptions.type === 'pat') {
            request.headers['Personal-Access-Token'] = this.authOptions.pat;
        }
        if (this.authOptions.type === 'oat') {
            request.headers['API-Token'] = this.authOptions.oat;
        }
    }

}