import { IsInt, IsNotEmpty, IsOptional, IsString, IsDecimal } from 'class-validator';

export class StorePoolDto {
  @IsString()
  @IsNotEmpty()
  project_name: string;

  @IsString()
  @IsNotEmpty()
  contract_address: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  participants?: number;

  @IsDecimal()
  @IsOptional()
  funds_raised?: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  start_date?: Date;

  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsOptional()
  chain?: string;

  @IsString()
  @IsOptional()
  curator?: string;
}
