import { IsOptional, IsString, IsInt } from 'class-validator';

export class PaginationDto {
  @IsInt()
  page: number;

  @IsInt()
  limit: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  chain?: string;
}
