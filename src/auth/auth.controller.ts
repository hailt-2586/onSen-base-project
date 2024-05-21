import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from '@shared/decorators/common.decorator';
import { LoginDto } from '@src/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage('Handle login')
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
