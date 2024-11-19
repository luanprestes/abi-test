import { Injectable } from '@nestjs/common';
import { Article } from './dtos/article.dto';
import { ArticlesRepository } from './articles.repository';

@Injectable()
export class ArticlesService {
  constructor(private repository: ArticlesRepository) {}

  async create(
    title: string,
    content: string,
    creatorId: number,
  ): Promise<Article> {
    return this.repository.create(title, content, creatorId);
  }

  async findAll(): Promise<Article[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<Article | null> {
    return this.repository.findOne(id);
  }

  async update(
    id: number,
    title: string,
    content: string,
  ): Promise<Article | null> {
    const article = this.repository.findOne(id);
    if (!article) return null;

    return this.repository.update(id, title, content);
  }

  async delete(id: number): Promise<Article> {
    return this.repository.delete(id);
  }
}
