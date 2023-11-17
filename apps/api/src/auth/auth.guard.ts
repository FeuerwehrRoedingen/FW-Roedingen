import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

import { PUBLIC_KEY } from './auth.decorator'

import type { Claims } from 'types/user'

declare global {
  namespace Express {
    interface Request {
      user: Claims
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

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }
    
    return super.canActivate(context)
  }

  handleRequest<User>(err: Error, user: User, info:any, context: ExecutionContext, status: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
