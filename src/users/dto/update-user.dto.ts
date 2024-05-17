import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;
}
