import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage('Handle login user')
  @Post('login')
  @ApiOperation({ summary: 'Handle login user' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Handle login user', {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjB4OEQxIiwid2FsbGV0X2FkZHJlc3MiOiIweDhEMWYyMTNkNDBmOUM1Y2U3NjhmMmVlMzM4Q0IzODE0OWZhMDY1QzUiLCJzaWduYXR1cmUiOiIweGJjYjA3YzNkYjgwNjRiNzE0NTk3N2ViNjE4YmM2OTNkMGQ1YzIwMTA5OWRmMjk2OGYyODY4MGUzMGIzMmNlZDUxYjNlYzIzZjEyMWJhN2M1NzlkZmMxZDFkMGU0MTZlNGFhOTQ0N2VjMDhmMjk4YzQzOTRlNzUwNTMwZmQxMDdlMWIiLCJpYXQiOjE3MTY4NzkxNTcsImV4cCI6MTcxNjg4MDM1N30.CKVElfkBu-ipCWgfOLd9DkbjAgJOHV1_QvC5JNfZ5oE',
      expires_in: 1200,
      user: {
        username: '0x8D1',
        wallet_address: '0x8D1f213d40f9C5ce768f2ee338CB38149fa065C5',
        signature:
          '0xbcb07c3db8064b7145977eb618bc693d0d5c201099df2968f28680e30b32ced51b3ec23f121ba7c579dfc1d1d0e416e4aa9447ec08f298c4394e750530fd107e1b',
      },
    }),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
