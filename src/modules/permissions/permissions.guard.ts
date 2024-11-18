import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { Role } from 'src/core/entities/permissions/role';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermission = this.reflector.get<Role>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userPermission: Role = request.user?.permission;

    if (!userPermission) {
      throw new ForbiddenException('Permission not found');
    }

    if (
      this.permissionsService.checkPermission(
        userPermission,
        requiredPermission,
      )
    ) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }
}
