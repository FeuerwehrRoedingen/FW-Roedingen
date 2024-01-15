import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { z } from 'zod'

import { callAuth0API } from 'src/auth0_api'
import type { User, UserCreate } from '../../types/user'

const schema = z.custom<UserCreate>();

@Injectable()
export class UserService {

  async getAllUsers(){
    return callAuth0API({}, 'GET', 'users').then(res => res.data);
  }
  async getRoles(){
    return callAuth0API({}, 'GET', 'roles').then(res => res.data);
  }
  async getUser(id: string){
    return callAuth0API({}, 'GET', `users/${id}`).then(res => res.data);
  }
  async getRolesById(id: string){
    return callAuth0API({}, 'GET', `users/${id}/roles`).then(res => res.data);
  }
  async createUser(userCreate: UserCreate){

    try{

      const parsed = schema.parse(userCreate);
      
      console.log('userCreate', userCreate);
      
      const username = `${parsed.given_name[0].toLowerCase()}${parsed.family_name[0].toUpperCase()}${parsed.family_name.toLowerCase()}`
      const name = `${parsed.family_name}, ${parsed.given_name}`
      
      const user: Omit<User, 'user_id'> = {
        ...userCreate,
        name,
        email_verified: false,
        phone_verified: false,
        blocked: false,
        verify_email: true,
        nickname: username,
        username
      }
      
      //return callAuth0API(user, 'POST', 'users').then(res => res.data);
    }
    catch(error){
      return new InternalServerErrorException(error);
    }
  }
}
