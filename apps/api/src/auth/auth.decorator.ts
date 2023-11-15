
import { SetMetadata } from '@nestjs/common'

import type { Role } from 'types/user'

export const ROLES_KEY = 'roles'
export const PUBLIC_KEY = 'public'

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)

export const Admin  = () => Roles('Admin');
export const Member = () => Roles('Member')
export const Public = () => SetMetadata(PUBLIC_KEY, true)
