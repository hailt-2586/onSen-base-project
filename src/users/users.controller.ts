import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { StoreUserDto } from './dto/store-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '@shared/decorators/common.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ResponseMessage('Store new a user')
  @Post()
  async store(@Body() storeUserDto: StoreUserDto) {
    return this.userService.store(storeUserDto);
  }

  @ResponseMessage('Update a user by wallet address')
  @Patch(':wallet_address')
  async update(
    @Param('wallet_address') wallet_address: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(wallet_address, updateUserDto);
  }
}
