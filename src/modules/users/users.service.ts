import { Injectable } from '@nestjs/common';
import { Role } from 'src/core/entities/role';
import { User } from './dtos/user.dto';
import { UsersRepository } from './users.repository';
import { PasswordsService } from '../passwords/passwords.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private passwords: PasswordsService,
  ) {}

  async create(
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    const emailExists = await this.repository.findByEmail(email);
    if (emailExists) return null;

    const hashedPassword = await this.passwords.generatePassword(password);
    return this.repository.create(name, email, hashedPassword, permissionId);
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.repository.findOne(id);
  }

  async update(
    id: number,
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    let hashedPassword = null;
    if (password) {
      hashedPassword = await this.passwords.generatePassword(password);
    }

    return this.repository.update(
      id,
      name,
      email,
      hashedPassword,
      permissionId,
    );
  }

  async delete(id: number): Promise<User> {
    return this.repository.delete(id);
  }
}
