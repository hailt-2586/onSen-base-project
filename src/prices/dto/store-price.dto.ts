import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pool } from '../../pools/entites/pool.entity';

export class StorePriceDto {
  @ApiProperty({ type: () => Pool })
  pool: Pool;

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
