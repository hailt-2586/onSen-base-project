import { IsInt, IsDecimal, IsOptional, IsString, IsJSON } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class StorePoolDetailsDto {
  @IsInt()
  pool_id: number;

  @IsDecimal()
  price: number;

  @IsDecimal()
  volume: number;

  @IsDecimal()
  liquidity: number;

  @IsDecimal()
  raise: number;

  @IsOptional()
  @IsJSON()
  token_vesting?: any;

  @IsOptional()
  @IsJSON()
  token_cliff?: any;

  @IsOptional()
  @IsJSON()
  token_weightings?: any;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsJSON()
  team?: any;

  @IsOptional()
  @IsJSON()
  ecosystem?: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
