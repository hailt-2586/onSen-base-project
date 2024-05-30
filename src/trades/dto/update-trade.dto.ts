import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTradeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  trade_type?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  trade_amount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  trade_price?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: Date })
  trade_date?: Date;
}
