import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { PriceHistoryService } from './price_history.service';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorePriceHistoryDto } from './dto/store-price-history.dto';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { PriceHistoryMock } from '@shared/utils/mocks/price-history.mock';

@Controller('price-history')
@ApiTags('price history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @ResponseMessage('Store new a price history')
  @Post()
  @ApiOperation({ summary: 'Store new a price history' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a price history', PriceHistoryMock.store),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storePriceHistoryDto: StorePriceHistoryDto) {
    return this.priceHistoryService.store(storePriceHistoryDto);
  }
}
