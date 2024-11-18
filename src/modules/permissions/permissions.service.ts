import { Injectable } from '@nestjs/common';
import { Role } from 'src/core/entities/permissions/role';

@Injectable()
export class PermissionsService {
  checkPermission(userPermission: Role, requiredPermission: Role): boolean {
    const permissionOrder = [Role.READER, Role.EDITOR, Role.ADMIN];

    return (
      permissionOrder.indexOf(userPermission) >=
      permissionOrder.indexOf(requiredPermission)
    );
  }
}
