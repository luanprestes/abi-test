import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { Article } from './dtos/article.dto';
import { IArticlesRepository } from 'src/core/interfaces/articles-repository';

@Injectable()
export class ArticlesRepository implements IArticlesRepository<Article> {
  constructor(private prisma: PrismaService) {}

  select = {
    id: true,
    title: true,
    content: true,
    creator: {
      select: {
        id: true,
        name: true,
        email: true,
        permission: {
          select: {
            name: true,
          },
        },
      },
    },
  };

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
      select: this.select,
    });
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      select: this.select,
    });
  }

  async findOne(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id: Number(id) },
      select: this.select,
    });
  }

  async update(id: number, title?: string, content?: string): Promise<Article> {
    const newDataArticle: {
      title?: string;
      content?: string;
    } = {};

    if (title) newDataArticle.title = title;
    if (content) newDataArticle.content = content;

    return this.prisma.article.update({
      where: { id: Number(id) },
      data: newDataArticle,
      select: this.select,
    });
  }

  async delete(id: number): Promise<Article> {
    return this.prisma.article.delete({
      where: { id: Number(id) },
      select: this.select,
    });
  }
}
