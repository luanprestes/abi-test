import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/core/entity/users/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('permissionId') permissionId: number,
  ): Promise<User> {
    return this.usersService.create(name, email, password, permissionId);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
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
  async delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
