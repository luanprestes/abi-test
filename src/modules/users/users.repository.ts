import { Injectable } from '@nestjs/common';
import { Role } from 'src/core/entities/role';
import { PrismaService } from '../infra/prisma/prisma.service';
import { User } from './dtos/user.dto';
import { IUsersRepository } from 'src/core/interfaces/users-repository';

@Injectable()
export class UsersRepository implements IUsersRepository<User> {
  constructor(private prisma: PrismaService) {}

  select = {
    id: true,
    name: true,
    email: true,
    permission: {
      select: {
        name: true,
        id: true,
      },
    },
  };

  async create(
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        permissionId,
      },
      select: this.select,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.select,
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: this.select,
    });
  }

  async update(
    id: number,
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
        permissionId,
      },
      select: this.select,
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: Number(id) },
      select: this.select,
    });
  }
}
