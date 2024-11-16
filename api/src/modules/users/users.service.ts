import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/core/entity/permissions/role';
import { User } from 'src/core/entity/users/user';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  select = {
    id: true,
    name: true,
    email: true,
    permission: {
      select: {
        name: true,
      },
    },
  };

  async generatePassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    const hashedPassword = await this.generatePassword(password);
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
    const hashedPassword = await this.generatePassword(password);

    return this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password: hashedPassword,
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
