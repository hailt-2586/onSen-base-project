import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEcosystemDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  website?: string;
}
