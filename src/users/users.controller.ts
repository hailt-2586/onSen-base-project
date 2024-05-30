import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { StoreUserDto } from './dto/store-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { UserMock } from '@shared/utils/mocks/user.mock';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ResponseMessage('Store new a user')
  @Post()
  @ApiOperation({ summary: 'Store new a user' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.CREATED, 'Store new a user', UserMock.store))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async store(@Body() storeUserDto: StoreUserDto) {
    return this.userService.store(storeUserDto);
  }

  @ResponseMessage('Get user by wallet_address')
  @Get(':wallet_address')
  @ApiOperation({ summary: 'Get user by wallet_address' })
  @ApiResponse(
    exampleSuccessResponse(
      HttpStatus.OK,
      'Get user by wallet_address',
      UserMock.getByWalletAddress,
    ),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  findOne(@Param('wallet_address') wallet_address: string) {
    return this.userService.findByWalletAddress(wallet_address);
  }

  @ResponseMessage('Update a user by wallet_address')
  @Patch(':wallet_address')
  @ApiOperation({ summary: 'Update a user by wallet_address' })
  @ApiResponse(
    exampleSuccessResponse(
      HttpStatus.OK,
      'Update a user by wallet_address',
      UserMock.updateByWalletAddress,
    ),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async update(
    @Param('wallet_address') wallet_address: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(wallet_address, updateUserDto);
  }

  @ResponseMessage('Delete a user by wallet_address')
  @Delete(':wallet_address')
  @ApiOperation({ summary: 'Delete a user by wallet_address' })
  @ApiResponse(
    exampleSuccessResponse(
      HttpStatus.OK,
      'Delete a user by wallet_address',
      UserMock.deleteByWalletAddress,
    ),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async remove(@Param('wallet_address') wallet_address: string) {
    return this.userService.remove(wallet_address);
  }
}
