
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

export type Role = (
  'Admin'  |
  'Member' |
  'User'
);
