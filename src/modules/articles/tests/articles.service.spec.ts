import { ArticlesService } from '../articles.service';
import { ArticlesRepositoryMock } from './articles.repository.mock';
import { Article } from '../dtos/article.dto';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repository: any;

  beforeEach(() => {
    repository = new ArticlesRepositoryMock();
    service = new ArticlesService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an article', async () => {
    const articleData = {
      title: 'Test Title',
      content: 'Test Content',
      creatorId: 1,
    };
    const article: Article = {
      id: 1,
      ...articleData,
      creator: {
        id: 1,
        name: 'User Name',
        email: 'user@example.com',
        permission: {
          name: 'Reader',
        },
      },
      creatorId: 1,
    };

    const result = await service.create(
      articleData.title,
      articleData.content,
      articleData.creatorId,
    );

    expect(result).toEqual(article);
  });

  it('should return all articles', async () => {
    const articles: Article[] = [
      {
        id: 1,
        title: 'Test Title 1',
        content: 'Test Content 1',
        creator: {
          id: 1,
          name: 'User Name',
          email: 'user@example.com',
          permission: {
            name: 'Reader',
          },
        },
        creatorId: 1,
      },
      {
        id: 2,
        title: 'Test Title 2',
        content: 'Test Content 2',
        creator: {
          id: 2,
          name: 'User Name',
          email: 'user@example.com',
          permission: {
            name: 'Reader',
          },
        },
        creatorId: 2,
      },
    ];

    await repository.create('Test Title 1', 'Test Content 1', 1);
    await repository.create('Test Title 2', 'Test Content 2', 2);

    const result = await service.findAll();

    expect(result).toEqual(articles);
  });

  it('should return an article by ID', async () => {
    const articleId = 1;
    const article: Article = {
      id: articleId,
      title: 'Test Title',
      content: 'Test Content',
      creator: {
        id: 1,
        name: 'User Name',
        email: 'user@example.com',
        permission: {
          name: 'Reader',
        },
      },
      creatorId: 1,
    };

    await repository.create(article.title, article.content, article.creator.id);

    const result = await service.findOne(articleId);

    expect(result).toEqual(article);
  });

  it('should update an article', async () => {
    const articleId = 1;
    const articleData = { title: 'Updated Title', content: 'Updated Content' };
    const updatedArticle: Article = {
      id: articleId,
      ...articleData,
      creator: {
        id: 1,
        name: 'User Name',
        email: 'user@example.com',
        permission: {
          name: 'Reader',
        },
      },
      creatorId: 1,
    };

    await repository.create('Test Title', 'Test Content', 1);
    const result = await service.update(
      articleId,
      articleData.title,
      articleData.content,
    );

    expect(result).toEqual(updatedArticle);
  });

  it('should return null if article does not exist when updating', async () => {
    const articleId = 999;
    const articleData = { title: 'Updated Title', content: 'Updated Content' };

    const result = await service.update(
      articleId,
      articleData.title,
      articleData.content,
    );

    expect(result).toBeNull();
  });

  it('should delete an article', async () => {
    const articleId = 1;
    const deletedArticle: Article = {
      id: articleId,
      title: 'Test Title',
      content: 'Test Content',
      creator: {
        id: 1,
        name: 'User Name',
        email: 'user@example.com',
        permission: {
          name: 'Reader',
        },
      },
      creatorId: 1,
    };

    await repository.create('Test Title', 'Test Content', 1);
    const result = await service.delete(articleId);

    expect(result).toEqual(deletedArticle);
  });
});
