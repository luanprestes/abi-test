import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/core/entities/role';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (permission: Role) => {
  return SetMetadata(PERMISSIONS_KEY, permission);
};
