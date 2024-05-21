import { IsInt, IsDecimal, IsString } from 'class-validator';

export class StoreTransactionDto {
  @IsInt()
  user_id: number;

  @IsInt()
  pool_id: number;

  @IsString()
  transaction_hash: string;

  @IsDecimal()
  amount: number;

  @IsDecimal()
  price: number;
}
