import { IsOptional, IsString, IsDecimal, IsInt, IsDateString } from 'class-validator';

export class StorePoolDto {
  @IsString()
  name: string;

  @IsString()
  ticker: string;

  @IsInt()
  participants: number;

  @IsDecimal()
  funds_raised: number;

  @IsOptional()
  @IsDateString()
  live_until?: Date;

  @IsString()
  status: string;

  @IsOptional()
  @IsDateString()
  opens_on?: Date;

  @IsString()
  chain: string;

  @IsOptional()
  @IsDateString()
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  end_date?: Date;

  @IsOptional()
  @IsString()
  curator?: string;
}
