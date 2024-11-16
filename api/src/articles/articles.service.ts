import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(
    title: string,
    content: string,
    creatorId: number,
  ): Promise<Article> {
    return this.prisma.article.create({
      data: {
        title,
        content,
        creatorId,
      },
    });
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async findOne(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
    });
  }

  async update(id: number, title: string, content: string): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  }

  async delete(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
