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
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

import { User } from 'src/core/entity/users/user';
import { UserDocs } from './dtos/docs.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User data to create',
    type: [UserDocs],
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: [UserDocs],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('permissionId') permissionId: number,
  ): Promise<User> {
    return this.usersService.create(name, email, password, permissionId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users',
    type: [UserDocs],
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: [UserDocs] })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.usersService.findOne(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({
    description: 'User data to update',
    type: [UserDocs],
  })
  @ApiResponse({ status: 200, description: 'User updated', type: [UserDocs] })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('permissionId') permissionId: number,
  ): Promise<User> {
    return this.usersService.update(id, name, email, password, permissionId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted', type: [UserDocs] })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete(@Param('id') id: number): Promise<User> {
    try {
      const user = await this.usersService.delete(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
