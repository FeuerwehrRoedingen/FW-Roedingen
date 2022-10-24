import { AuthorizationCode, Client, Falsey, RefreshToken, Token, User } from "oauth2-server";

export async function generateAccessToken(
  client: Client,
  user: User,
  scope:string
): Promise<string> {
  return new Promise<string>(async function(resolve, reject){

  })
}
export async function generateRefreshToken(
  client: Client,
  user: User,
  scope:string
): Promise<string> {
  return new Promise<string>(async function(resolve, reject){

  })
}
export async function generateAuthorizationCode(
  client: Client,
  user: User,
  scope:string
): Promise<string> {
  return new Promise<string>(async function(resolve ,reject){

  })
}

export async function getAccessToken(
  accessToken: string
): Promise<Token|Falsey> {
  return new Promise<Token|Falsey>(async function(resolve, reject){
    
  })
}
export async function getRefreshToken(
  refreshToken: string
): Promise<RefreshToken|Falsey> {
  return new Promise<RefreshToken|Falsey>(async function(resolve, reject){
    
  })
}
export async function getAuthorizationCode(
  AuthorizationCode: string
): Promise<AuthorizationCode> {
  return new Promise<AuthorizationCode>(async function(resolve, reject){
    
  })
}
export async function getClient(
  clientId: string,
  clientSecret: string
): Promise<Client> {
  return new Promise<Client>(async function(resolve, reject){

  })
}
export async function getUser(
  user: string,
  password: string
): Promise<User> {
  return new Promise<User>(async function(resolve, reject){

  })
}
export async function getUserFromClient(
  client: Client
): Promise<User> {
  return new Promise<User>(async function(resolve, reject){

  })
}

export async function saveToken(
  token: Token,
  client: Client,
  user: User
): Promise<Token> {
  return new Promise<Token>(async function(resolve, reject){

  })
}
export async function saveAuthorizationCode(
  code: AuthorizationCode,
  client: Client,
  user: User
): Promise<AuthorizationCode> {
  return new Promise<AuthorizationCode>(async function(resolve, reject){

  })
}

export async function revokeToken(
  refreshToken: RefreshToken
): Promise<boolean> {
  return new Promise<boolean>(async function(resolve, reject){

  })
}
export async function revokeAuthorizationCode(
  authorizationCode: AuthorizationCode
): Promise<boolean> {
  return new Promise<boolean>(async function(resolve, reject){
    
  })
}

export async function validateScope(
  user: User,
  client: Client,
  scope: string
): Promise<string|Falsey> {
  return new Promise<string|Falsey>(async function(resolve, reject){
    
  })
}
export async function verifyScope(
  accessToken: Token,
  scope:string
):Promise<boolean> {
  return new Promise<boolean>(async function(resolve, reject){
    
  })
}
