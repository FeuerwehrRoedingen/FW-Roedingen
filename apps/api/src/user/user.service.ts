import { Injectable } from '@nestjs/common';

import { callAuth0API } from 'src/auth0_api';

@Injectable()
export class UserService {

  getAllUsers(){
    return callAuth0API({}, 'GET', '/users');
  }
  getRoles(){
    return callAuth0API({}, 'GET', '/roles');
  }
  getUser(id: string){
    return callAuth0API({}, 'GET', `/users/${id}`);
  }
  getRolesById(id: string){
    return callAuth0API({}, 'GET', `/users/${id}/roles`);
  }
}
