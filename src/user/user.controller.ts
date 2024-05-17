import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { StoreUserDto } from './dto/store-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/store')
  @HttpCode(HttpStatus.ACCEPTED)
  async store(@Body() storeUserDto: StoreUserDto) {
    return this.userService.store(storeUserDto);
  }
}
