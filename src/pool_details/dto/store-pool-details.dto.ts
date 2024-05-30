import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StorePoolDetailsDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  pool_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  curator_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  curator_comments?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  duration_start_date?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  duration_end_date?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  token_vesting_start?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  token_vesting_end?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  cliff_date?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  cliff_end_date?: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  start_weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  end_weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  starting_balances?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  current_balances?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  project_token_release?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  swap_fee?: number;
}
