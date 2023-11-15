import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

import { PUBLIC_KEY, ROLES_KEY } from './auth.decorator'

import type { User } from 'types/user'
import type { Request } from 'express'
import { callAuth0API } from 'src/auth0_api'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private readonly reflector: Reflector
  ) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }
    
    if(!super.canActivate(context)) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest<Request>()
    const roles = await callAuth0API({}, 'GET', `users/${user.user_id}/roles`).then(res => res.data);

    return requiredRoles.some((role) => roles.includes(role))

  }

  handleRequest<User>(err: Error, user: User, info:any, context: ExecutionContext, status: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
