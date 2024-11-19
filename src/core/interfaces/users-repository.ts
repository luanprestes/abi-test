import { Role } from '../entities/role';

export interface IUsersRepository<T> {
  create(
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  update(
    id: number,
    name: string,
    email: string,
    password: string,
    permissionId: Role,
  ): Promise<T>;
  delete(id: number): Promise<T>;
}
