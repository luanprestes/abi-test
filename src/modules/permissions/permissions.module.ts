import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './permissions.guard';

@Module({
  providers: [PermissionsService, PermissionsGuard],
  exports: [PermissionsGuard, PermissionsService],
})
export class PermissionsModule {}
