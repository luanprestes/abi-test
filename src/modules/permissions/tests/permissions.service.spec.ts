import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from '../permissions.service';
import { Role } from '../../../core/entities/role';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsService],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should allow ADMIN to access ADMIN permissions', () => {
    expect(service.checkPermission(Role.ADMIN, Role.ADMIN)).toBe(true);
  });

  it('should allow ADMIN to access EDITOR permissions', () => {
    expect(service.checkPermission(Role.ADMIN, Role.EDITOR)).toBe(true);
  });

  it('should allow ADMIN to access READER permissions', () => {
    expect(service.checkPermission(Role.ADMIN, Role.READER)).toBe(true);
  });

  it('should allow EDITOR to access EDITOR permissions', () => {
    expect(service.checkPermission(Role.EDITOR, Role.EDITOR)).toBe(true);
  });

  it('should allow EDITOR to access READER permissions', () => {
    expect(service.checkPermission(Role.EDITOR, Role.READER)).toBe(true);
  });

  it('should not allow EDITOR to access ADMIN permissions', () => {
    expect(service.checkPermission(Role.EDITOR, Role.ADMIN)).toBe(false);
  });

  it('should allow READER to access READER permissions', () => {
    expect(service.checkPermission(Role.READER, Role.READER)).toBe(true);
  });

  it('should not allow READER to access EDITOR permissions', () => {
    expect(service.checkPermission(Role.READER, Role.EDITOR)).toBe(false);
  });

  it('should not allow READER to access ADMIN permissions', () => {
    expect(service.checkPermission(Role.READER, Role.ADMIN)).toBe(false);
  });
});
