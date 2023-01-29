import { client } from './pocketbase.js'
import { AuthRequestRecord, AuthRequestResponse, Collections, TokenRecord, TokenResponse, UsersResponse } from './pocketbase-types.js'

/**
 * listener Callback that does not do anything, but porevents unhandled rejection errors
 */
let ignore = () => { };
/**
 * creates a new Date string for now + time in ms
 * @param time in ms
 * @returns date string
 */
let expires = (time:number) => new Date(Date.now() + time).toISOString();

//
// AuthRequest Methods
//

export async function createAuthrequest(email: string, code: string) {
  return new Promise<AuthRequestRecord>(async (resolve, reject) => {
    client.collection(Collections.Users).getFirstListItem<UsersResponse>(`email="${email}"`)
      .then(user => {

        // construct auth request object and push it to db

        function _create(){
          let data: AuthRequestRecord = {
            user: user.id,
            code,
            expires: expires(60_000)
          }
          client.collection(Collections.AuthRequest).create<AuthRequestResponse>(data)
            .then(authRequest => {
  
              // delete auth request one minute after creation
  
              setTimeout(() => deleteAuthRequest(authRequest.id).then(ignore, ignore), 60_000);
              resolve(authRequest);
  
            }, reject)
        } 

        // Check if user already has open auth Request and delete it if yes

        client.collection(Collections.AuthRequest).getFirstListItem(`user="${user.id}"`)
          .then(authRequest => {
            deleteAuthRequest(authRequest.id)
              .then(_create, reject);
          }, _create);
      }, reject);
  });
}
export async function deleteAuthRequest(id: string) {
  return client.collection(Collections.AuthRequest).delete(id);
}
export async function getAuthRequest(code: string){
  return client.collection(Collections.AuthRequest).getFirstListItem<AuthRequestResponse>(`code="${code}"`)
}

//
// Token Methods
//

export async function createToken(userID: string, access_token: string, refresh_token: string) {
  return new Promise<TokenResponse>(async (resolve, reject) => {

    function _create(){
      // delete code linked to this users auth request
      client.collection(Collections.AuthRequest).getFirstListItem(`user="${userID}"`)
        .then(token => {
          client.collection(Collections.AuthRequest).delete(token.id);
        }, ignore)
      
      let data: TokenRecord = {
        user: userID,
        access_token,
        access_expires: expires(60_000), //one minute
        refresh_token,
        refresh_expires: expires(1_800_000) //60 minutes
      }

      client.collection(Collections.Token).create<TokenResponse>(data)
        .then(resolve, reject);
    }

    client.collection(Collections.Token).getFirstListItem<TokenResponse>(`user="${userID}"`)
      .then(token => {
        deleteToken(token.id)
          .then(_create, reject);
      }, reason => {
        //TODO check if reason is 404 and proceed
        if(reason.status === '404'){ // not tested
          return reject();
        }
        _create();
      });

  });
}
export async function getToken(userID: string) {
  return new Promise<TokenResponse>(async (resolve, reject) => {
    client.collection(Collections.Token).getFirstListItem<TokenResponse>(`user="${userID}"`)
      .then(token => {

          // Access Token expired
          if (new Date(token.access_expires!) < new Date(Date.now())) {
            deleteToken(token.id);
          }

          // Refresh Token expired
          if (new Date(token.refresh_expires!) < new Date(Date.now())) {
            deleteToken(token.id);
          }

          //valid
          resolve(token);
      }, reject);
  });
}
export async function updateToken(userID: string, access_token: string|undefined, refresh_token: string|undefined) {
  return new Promise<TokenResponse>(async (resolve, reject) => {
    let data: TokenRecord = access_token ? refresh_token ? 
    {
      user: userID,
      access_token,
      access_expires: expires(60_000), //one minute
      refresh_token,
      refresh_expires: expires(1_800_000) //60 minutes
    } :
    {
      user: userID,
      access_token,
      access_expires: expires(60_000), //one minute
    } :
    {
      user: userID,
      refresh_token,
      refresh_expires: expires(1_800_000) //60 minutes
    };

    client.collection(Collections.Token).getFirstListItem(`user="${userID}"`)
      .then(token => {
        client.collection(Collections.Token).update<TokenResponse>(token.id, data)
          .then(resolve, reject);
      }, reject)
  
  })
}
export async function deleteToken(id: string) {
  return client.collection(Collections.Token).delete(id);
}

//
// User Methods
//

export async function getUserFromToken(accesToken: string){
  return new Promise<UsersResponse>(async (resolve, reject) => {
    client.collection(Collections.Token).getFirstListItem<TokenResponse>(`access_token="${accesToken}"`)
      .then(token => {
        client.collection(Collections.Users).getOne<UsersResponse>(token.user)
          .then(resolve, reject);
      }, reject)
  })
}
