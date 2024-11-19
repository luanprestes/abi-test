import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordsService {
  constructor() {}

  async generatePassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
