import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ISocialLink } from '../../pools/pool.interface';
import { SocialLinkDto } from '../../pools/dto/store-pool.dto';

export class UpdateTeamMemberDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  position?: string;

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
}
