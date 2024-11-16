import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from 'src/core/entity/articles/article';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArticleDocs } from './dtos/docs.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: 'Create a new article' })
  @ApiBody({
    description: 'Article data',
    type: [ArticleDocs],
  })
  @ApiResponse({
    status: 201,
    description: 'Article successfully created',
    type: [ArticleDocs],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('creatorId') creatorId: number,
  ): Promise<Article> {
    return this.articlesService.create(title, content, creatorId);
  }

  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all articles',
    type: [ArticleDocs],
  })
  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @ApiOperation({ summary: 'Get article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article found',
    type: [ArticleDocs],
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Article> {
    try {
      const article = await this.articlesService.findOne(id);

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return article;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Update an article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiBody({
    description: 'Article data to update',
    type: [ArticleDocs],
  })
  @ApiResponse({
    status: 200,
    description: 'Article updated',
    type: [ArticleDocs],
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Article> {
    return this.articlesService.update(id, title, content);
  }

  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article deleted',
    type: [ArticleDocs],
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Article> {
    try {
      const article = await this.articlesService.delete(id);

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return article;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
