import { User } from '../dtos/user.dto';
import { Role } from 'src/core/entities/role';

export class UsersRepositoryMock {
  private users: User[] = [];
  private idCounter = 1;

  async create(
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User> {
    const newUser: User = {
      id: this.idCounter++,
      name,
      email,
      password,
      permission: {
        name:
          permissionId === Role.ADMIN
            ? 'Admin'
            : permissionId === Role.EDITOR
              ? 'Editor'
              : 'Reader',
      } as any,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async update(
    id: number,
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    user.name = name;
    user.email = email;
    user.password = password;
    user.permission = {
      name:
        permissionId === Role.ADMIN
          ? 'Admin'
          : permissionId === Role.EDITOR
            ? 'Editor'
            : 'Reader',
    } as any;
    return user;
  }

  async delete(id: number): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email);
  }
}
