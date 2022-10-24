import { PrismaClient, User } from '@prisma/client-api'

import { createHmac } from 'crypto';

const db = new PrismaClient();

//TODO Implement oauth
export async function authenticate(_username: string, _password: string): Promise<Omit<User, 'password'> | undefined>{
  const result = await db.user.findUnique({
    where: { username: _username }
  });
  if( result === null){
    return undefined;
  }
  if(result.password !== hashPassword(_password)){
    return undefined;
  }
  const { password, ...user} = result;
  return user
}

export function hashPassword(input: string): string{
  if(!process.env.hash_secret){
    throw new Error('no secret');
  }
  const hash = createHmac('sha256', process.env.HASH_SECRET!)
    .update(input)
    .digest('base64');
  return hash;
}