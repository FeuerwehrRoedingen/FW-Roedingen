import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import type { Request } from 'express'
import { callAuth0API } from 'src/auth0_api'
import { ROLES_KEY } from './auth.decorator'
import { Role } from 'types/user'

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const user = context.switchToHttp().getRequest<Request>().user;
    
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true;
    }

    const roles: Role[] = await callAuth0API({}, 'GET', `users/${user.sub}/roles`).then(res => res.data);

    return roles.some( role => requiredRoles.includes(role.name));
  }
}
