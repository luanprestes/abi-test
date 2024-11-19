import { Module } from '@nestjs/common';

import { PrismaModule } from '../infra/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';
import { PasswordsModule } from '../passwords/passwords.module';

@Module({
  imports: [
    PrismaModule,
    PasswordsModule,
    PermissionsModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
  ],
})
export class AppModule {}
