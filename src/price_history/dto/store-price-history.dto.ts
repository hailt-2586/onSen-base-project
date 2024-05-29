import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StorePriceHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  pool_id: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ type: String, example: '2024-05-29T14:48:00.000Z' })
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;
}
