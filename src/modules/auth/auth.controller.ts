import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login to get JWT token' })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  /* HTTP */
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log(email);
    console.log(password);
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
