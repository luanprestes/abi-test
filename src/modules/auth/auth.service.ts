import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/core/entities/users/user';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        permission: {
          select: {
            name: true,
          },
        },
      },
    })) as UserEntity;

    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }
}
