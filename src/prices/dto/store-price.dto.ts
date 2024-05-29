import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StorePriceDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  pool_id: number;

  @IsNumber()
  @ApiProperty({ example: 0 })
  current_price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 0, required: false })
  market_cap?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 0, required: false })
  liquidity?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 0, required: false })
  pool_value?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 0, required: false })
  fdv?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 0, required: false })
  volume?: number;
}
