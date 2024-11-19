import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/modules/infra/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { UsersRepository } from './users.repository';
import { PasswordsModule } from '../passwords/passwords.module';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  imports: [
    PasswordsModule,
    PrismaModule,
    AuthModule,
    forwardRef(() => PermissionsModule),
  ],
})
export class UsersModule {}
