import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  avatar?: string;
}
