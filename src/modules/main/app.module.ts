import { Module } from '@nestjs/common';

import { PrismaModule } from '../infra/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { UsersModule } from '../users/users.module';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PermissionsModule,
    UsersModule,
    ArticlesModule,
  ],
})
export class AppModule {}
