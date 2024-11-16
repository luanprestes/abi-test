import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { ArticlesModule } from 'src/modules/articles/articles.module';

@Module({
  imports: [PrismaModule, UsersModule, ArticlesModule],
})
export class AppModule {}
