// users.service.spec.ts
import { UsersService } from '../users.service';
import { UsersRepositoryMock } from './users.repository.mock';
import { User } from '../dtos/user.dto';
import { Role } from 'src/core/entities/role';

describe('UsersService', () => {
  let service: UsersService;
  let repository: any;

  beforeEach(() => {
    repository = new UsersRepositoryMock();
    service = new UsersService(repository, {
      generatePassword: jest.fn().mockImplementation((password) => password),
    });
  });

  it('should create a user', async () => {
    const userData = {
      name: 'User Name',
      email: 'user@example.com',
      password: 'password123',
      permissionId: Role.ADMIN,
    };

    const user: User = {
      id: 1,
      name: 'User Name',
      email: 'user@example.com',
      password: 'password123',
      permission: {
        name: 'Admin',
      },
    };

    const result = await service.create(
      userData.name,
      userData.email,
      userData.password,
      userData.permissionId,
    );

    expect(result).toEqual(user);
  });

  it('should return all users', async () => {
    const users: User[] = [
      {
        id: 1,
        name: 'User Name',
        email: 'user@example.com',
        password: 'password123',
        permission: {
          name: 'Admin',
        },
      },
      {
        id: 2,
        name: 'Another User',
        email: 'another@example.com',
        password: 'password456',
        permission: {
          name: 'Editor',
        },
      },
    ];

    await repository.create(
      'User Name',
      'user@example.com',
      'password123',
      Role.ADMIN,
    );
    await repository.create(
      'Another User',
      'another@example.com',
      'password456',
      Role.EDITOR,
    );

    const result = await service.findAll();

    expect(result).toEqual(users);
  });

  it('should return a user by ID', async () => {
    const userId = 1;
    const user: User = {
      id: userId,
      name: 'User Name',
      email: 'user@example.com',
      password: 'password123',
      permission: {
        name: 'Admin',
      },
    };

    await repository.create(user.name, user.email, user.password, Role.ADMIN);

    const result = await service.findOne(userId);

    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const userId = 1;
    const userData = {
      name: 'Updated Name',
      email: 'updated@example.com',
      password: 'newpassword123',
      permissionId: Role.EDITOR,
    };

    const updatedUser: User = {
      id: userId,
      name: 'Updated Name',
      email: 'updated@example.com',
      password: 'newpassword123',
      permission: {
        name: 'Editor',
      },
    };

    await repository.create(
      'User Name',
      'user@example.com',
      'password123',
      Role.ADMIN,
    );

    const result = await service.update(
      userId,
      userData.name,
      userData.email,
      userData.password,
      userData.permissionId,
    );

    expect(result).toEqual(updatedUser);
  });

  it('should return null if user does not exist when updating', async () => {
    const userId = 999;
    const userData = {
      name: 'Updated Name',
      email: 'updated@example.com',
      password: 'newpassword123',
      permissionId: Role.EDITOR,
    };

    const result = await service.update(
      userId,
      userData.name,
      userData.email,
      userData.password,
      userData.permissionId,
    );

    expect(result).toBeNull();
  });

  it('should delete a user', async () => {
    const userId = 1;
    const deletedUser: User = {
      id: userId,
      name: 'User Name',
      email: 'user@example.com',
      password: 'password123',
      permission: {
        name: 'Admin',
      },
    };

    await repository.create(
      'User Name',
      'user@example.com',
      'password123',
      Role.ADMIN,
    );

    const result = await service.delete(userId);

    expect(result).toEqual(deletedUser);
  });
});
