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
  token_vesting_start?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  token_vesting_end?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  token_cliff?: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  swap_fee?: number;
}
