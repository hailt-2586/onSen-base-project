import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreEcosystemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: Number })
  pool_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  website?: string;
}
