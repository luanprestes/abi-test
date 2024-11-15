import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Role } from 'src/permissions/permissions.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        permissionId,
      },
    });

    return user;
  }
}
