import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor (
    private readonly userService: UserService
  ) { }

  @Get()
  getUser(){
    return this.userService.getAllUsers();
  }
  @Get('roles')
  getRoles(){
    return this.userService.getRoles();
  }
  @Get(':id')
  getUserById(@Param('id') id: string){
    return this.userService.getUser(id);
  }
  @Get(':id/roles')
  getRolesById(@Param('id') id: string){
    return this.userService.getRolesById(id);
  }
}
