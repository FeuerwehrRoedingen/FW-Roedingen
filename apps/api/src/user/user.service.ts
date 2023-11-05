import { Injectable } from '@nestjs/common';

import { callAuth0API } from 'src/auth0_api';

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
}
