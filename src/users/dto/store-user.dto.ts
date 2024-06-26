import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  wallet_address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  signature: string;
}
