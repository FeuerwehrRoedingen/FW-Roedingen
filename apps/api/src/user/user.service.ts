import { Injectable } from '@nestjs/common';

import { callAuth0API } from 'src/auth0_api';

@Injectable()
export class UserService {

  getAllUsers(){
    return callAuth0API({}, 'GET', '/users');
  }
}
