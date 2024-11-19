import { forwardRef, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/modules/infra/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { ArticlesRepository } from './articles.repository';

@Module({
  providers: [ArticlesRepository, ArticlesService],
  controllers: [ArticlesController],
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => PermissionsModule),
  ],
})
export class ArticlesModule {}
