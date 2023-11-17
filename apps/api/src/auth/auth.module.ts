import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from './auth.guard'
import { RoleGuard } from './role.guard'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RoleGuard],
  controllers: [AuthController],
  exports: [PassportModule, JwtAuthGuard, RoleGuard]
})
export class AuthModule {}
