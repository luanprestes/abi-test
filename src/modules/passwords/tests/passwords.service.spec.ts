import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsService } from '../passwords.service';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('PasswordsService', () => {
  let service: PasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordsService],
    }).compile();

    service = module.get<PasswordsService>(PasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash the password correctly', async () => {
    const password = 'testPassword';
    const hashedPassword = 'hashedPassword123';

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    const result = await service.generatePassword(password);
    expect(result).toEqual(hashedPassword);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
  });
});
