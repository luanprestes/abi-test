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
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

import { UserDocs } from './dtos/docs.dto';
import { UsersService } from './users.service';
import { User } from './dtos/user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* Documentation */
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* HTTP */
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('permissionId') permissionId: number,
  ): Promise<User> {
    return this.usersService.create(name, email, password, permissionId);
  }

  /* Documentation */
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all users',
    type: [UserDocs],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  /* HTTP */
  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /* Documentation */
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found', type: [UserDocs] })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* HTTP */
  @Get(':id')
  @UseGuards(AuthGuard)
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

  /* Documentation */
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({
    description: 'User data to update',
    type: [UserDocs],
  })
  @ApiResponse({ status: 200, description: 'User updated', type: [UserDocs] })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* HTTP */
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('permissionId') permissionId: number,
  ): Promise<User> {
    return this.usersService.update(id, name, email, password, permissionId);
  }

  /* Documentation */
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted', type: [UserDocs] })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Invalid or missing JWT token',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  /* HTTP */
  @Delete(':id')
  @UseGuards(AuthGuard)
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
