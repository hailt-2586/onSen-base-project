import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreTradeDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  pool_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  trade_type: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  trade_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  trade_price: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: Date })
  trade_date: Date;
}
