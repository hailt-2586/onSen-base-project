import { IsNotEmpty, IsString } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  @IsString()
  wallet_address: string;
}
