import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { StoreUserDto } from './dto/store-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/store')
  @HttpCode(HttpStatus.ACCEPTED)
  async store(@Body() data: StoreUserDto): Promise<{
    id: number;
    public_address: string;
    nonce: string;
  }> {
    return this.userService.store(data);
  }
}
