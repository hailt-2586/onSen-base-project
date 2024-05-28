import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { E_STATUS } from '@shared/enums/common.enum';

export class StorePoolDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  project_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  ticker: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  participants: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  funds_raised: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String })
  live_until?: Date;

  @IsNotEmpty()
  @IsEnum(E_STATUS)
  @ApiProperty({ examples: [E_STATUS.LIVE, E_STATUS.UPCOMING] })
  status: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String })
  opens_on?: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  chain: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String })
  start_date?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  curator?: string;
}
