import { Options } from "express-oauth-server";
import { AuthorizationCode, Client, Falsey, RefreshToken, Token, User } from "oauth2-server";
import { PrismaClient } from '@prisma/client-oauth'

const database = new PrismaClient();

async function getAccessToken(
  accessToken: string
): Promise<Token|Falsey>{
    const response = await database.token.findUnique({
      where: { accessToken: accessToken }
    })
    if(response){
      const client = await database.client.findUnique({
        select: { grants: true },
        where: { id: response.clientId }
      })
      if(!client) return Promise.reject();
      return Promise.resolve({
        accessToken: response.accessToken,
        accessTokenExpiresAt: response.accessTokenExpiresAt,
        client: {
          id: response.clientId,
          grants: client.grants
        },
        user: {
          id: response.userId
        }
      })
    }
    return Promise.resolve(null)
}
async function getRefreshToken(
  refreshToken: string
): Promise<RefreshToken|Falsey> {
  const response = await database.refreshToken.findUnique({
    where: { refreshToken: refreshToken }
  })
  if(response){
    const client = await database.client.findUnique({
      select: { grants: true },
      where: { id: response.clientId }
    })
    if(!client) return Promise.reject();
    return Promise.resolve({
      refreshToken: response.refreshToken,
      refreshTokenExpiresAt: response.refreshTokenExpiresAt,
      client: {
        id: response.clientId,
        grants: client.grants
      },
      user: {
        id: response.userId
      }
    })
  }
  return Promise.resolve(null)
}
async function getAuthorizationCode(
  AuthorizationCode: string
): Promise<AuthorizationCode> {
  return new Promise<AuthorizationCode>(async function(resolve, reject){
    
  })
}
async function getClient(
  clientId: string,
  clientSecret: string
): Promise<Client> {
  return new Promise<Client>(async function(resolve, reject){

  })
}
async function getUser(
  user: string,
  password: string
): Promise<User> {
  return new Promise<User>(async function(resolve, reject){

  })
}
async function getUserFromClient(
  client: Client
): Promise<User> {
  return new Promise<User>(async function(resolve, reject){

  })
}

async function saveToken(
  token: Token,
  client: Client,
  user: User
): Promise<Token> {
  return new Promise<Token>(async function(resolve, reject){

  })
}
async function saveAuthorizationCode(
  code: AuthorizationCode,
  client: Client,
  user: User
): Promise<AuthorizationCode> {
  return new Promise<AuthorizationCode>(async function(resolve, reject){

  })
}

async function revokeToken(
  refreshToken: RefreshToken
): Promise<boolean> {
  return new Promise<boolean>(async function(resolve, reject){

  })
}
async function revokeAuthorizationCode(
  authorizationCode: AuthorizationCode
): Promise<boolean> {
  return new Promise<boolean>(async function(resolve, reject){
    
  })
}

async function validateScope(
  user: User,
  client: Client,
  scope: string
): Promise<string|Falsey> {
  return new Promise<string|Falsey>(async function(resolve, reject){
    
  })
}
async function verifyScope(
  accessToken: Token,
  scope:string
):Promise<boolean> {
  return new Promise<boolean>(async function(resolve, reject){
    
  })
}

export const model: Options = {
  
  model: {
    getAccessToken,
    getAuthorizationCode,
    getClient,
    getRefreshToken,
    getUser,
    getUserFromClient,
    saveAuthorizationCode,
    saveToken,
    revokeAuthorizationCode,
    revokeToken,
    validateScope,
    verifyScope
  }
} 