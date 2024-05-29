import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { E_STATUS } from '@shared/enums/common.enum';
import { ISocialLink } from '../pool.interface';

export class SocialLinkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'website' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://projectwebsite.com' })
  url: string;
}

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
  @ApiProperty({ type: String, example: '2024-05-29T14:48:00.000Z' })
  live_until?: Date;

  @IsNotEmpty()
  @IsEnum(E_STATUS)
  @ApiProperty({ type: String, example: E_STATUS.LIVE })
  status: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String, example: '2024-05-29T14:48:00.000Z' })
  opens_on?: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  chain: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String, example: '2024-05-29T14:48:00.000Z' })
  start_date?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  curator?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    type: [SocialLinkDto],
    example: [
      { name: 'website', url: 'https://projectwebsite.com' },
      { name: 'twitter', url: 'https://twitter.com/project' },
    ],
  })
  social_links: ISocialLink[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  token_vesting: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  lbp_type: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String })
  about: string;
}
