import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { LoginDto } from './dto/login.dto';
import { AuthMock } from '@shared/utils/mocks/auth.mock';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage('Handle login user')
  @Post('login')
  @ApiOperation({ summary: 'Handle login user' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.CREATED, 'Handle login user', AuthMock.login))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
