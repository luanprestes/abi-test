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
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArticleDocs } from './dtos/docs.dto';
import { Article } from './dtos/article.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Permissions } from '../permissions/permissions.decorator';
import { Role } from 'src/core/entities/permissions/role';
import { PermissionsGuard } from '../permissions/permissions.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /* 
    Documentation 
  */
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* 
    HTTP 
  */
  @Post()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(Role.EDITOR)
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('creatorId') creatorId: number,
  ): Promise<Article> {
    return this.articlesService.create(title, content, creatorId);
  }

  /* 
    Documentation 
  */
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all articles',
    type: [ArticleDocs],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  /* 
    HTTP 
  */
  @Get()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(Role.READER)
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  /* 
    Documentation 
  */
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article found',
    type: [ArticleDocs],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* 
    HTTP 
  */
  @Get(':id')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(Role.READER)
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

  /* 
    Documentation 
  */
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* 
    HTTP 
  */
  @Put(':id')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(Role.EDITOR)
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Article> {
    try {
      let article = await this.articlesService.findOne(id);

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      article = await this.articlesService.update(id, title, content);
      return article;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  /* 
    Documentation 
  */
  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Article ID' })
  @ApiResponse({
    status: 200,
    description: 'Article deleted',
    type: [ArticleDocs],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'Article not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* 
    HTTP 
  */
  @Delete(':id')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions(Role.EDITOR)
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
