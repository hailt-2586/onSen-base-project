import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  wallet_address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  private_key: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;
}
