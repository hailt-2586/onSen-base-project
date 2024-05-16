import { IsString } from 'class-validator';

export class StoreUserDto {
  @IsString()
  public_address: string;

  @IsString()
  nonce: string;
}
