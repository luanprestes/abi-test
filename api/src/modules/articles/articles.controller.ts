import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from '@prisma/client';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('creatorId') creatorId: number,
  ): Promise<Article> {
    return this.articlesService.create(title, content, creatorId);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<Article> {
    return this.articlesService.update(id, title, content);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Article> {
    return this.articlesService.delete(id);
  }
}
