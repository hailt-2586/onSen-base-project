import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ErrorResponseDto {
  @ApiProperty({ type: Number, example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ApiProperty({ type: String, example: 'Unexpected error occurred' })
  message: string;

  @ApiProperty({ type: String, example: 'Internal Server Error.' })
  error: string;
}
