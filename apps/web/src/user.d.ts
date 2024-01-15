
export type Claims = {
  iss: string,
  sub: string,
  aud: string[] | string,
  iat: number,
  exp: number,
  azp: string,
  scope: string
}
export type User = {
  email: string,
  phone_number: string,
  user_metadata: UserMetadata,
  blocked: boolean,
  email_verified: boolean,
  phone_verified: boolean,
  app_metadata: AppMetadata,
  given_name: string,
  family_name: string,
  name: string,
  nickname?: string,
  picture?: string,
  user_id: string,
  connection: string,
  password: string,
  verify_email: boolean,
  username: string
}

export type UserMetadata = {

}
export type AppMetadata = {

}

export type UserCreate = Omit<User, 'user_id' | 'email_verified' | 'phone_verified' | 'blocked' | 'verify_email' | 'nickname' | 'username' | 'name'>

export type Role = {
  id: string,
  name: RoleName,
  description: string,
}
export type RoleName = (
  'Admin'  |
  'Member' |
  'User'
);
