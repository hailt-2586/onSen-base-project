import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePriceDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 100, required: false })
  current_price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1000000, required: false })
  market_cap?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 500000, required: false })
  liquidity?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 200000, required: false })
  pool_value?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1200000, required: false })
  fdv?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 30000, required: false })
  volume?: number;
}
