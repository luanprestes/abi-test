import { forwardRef, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/modules/infra/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
})
export class ArticlesModule {}
