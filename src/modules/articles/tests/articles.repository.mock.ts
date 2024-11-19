import { IArticlesRepository } from 'src/core/interfaces/articles-repository';
import { Article } from '../dtos/article.dto';

export class ArticlesRepositoryMock implements IArticlesRepository<Article> {
  private articles: Article[] = [];
  private idCounter = 1;

  async create(
    title: string,
    content: string,
    creatorId: number,
  ): Promise<Article> {
    const newArticle: Article = {
      id: this.idCounter++,
      title,
      content,
      creatorId,
      creator: {
        id: creatorId,
        name: 'User Name',
        email: 'user@example.com',
        permission: {
          name: 'Reader',
        },
      },
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  async findAll(): Promise<Article[]> {
    return this.articles;
  }

  async findOne(id: number): Promise<Article | null> {
    return this.articles.find((article) => article.id === id) || null;
  }

  async update(
    id: number,
    title: string,
    content: string,
  ): Promise<Article | null> {
    const article = await this.findOne(id);
    if (!article) return null;

    article.title = title;
    article.content = content;
    return article;
  }

  async delete(id: number): Promise<Article | null> {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) return null;

    const [deletedArticle] = this.articles.splice(index, 1);
    return deletedArticle;
  }
}
