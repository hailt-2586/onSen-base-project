import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TradesService } from './trades.service';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { StoreTradeDto } from './dto/store-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { TradeMock } from '@shared/utils/mocks/trade.mock';

@Controller('trades')
@ApiTags('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @ResponseMessage('Store new a trade')
  @Post()
  @ApiOperation({ summary: 'Store new a trade' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.CREATED, 'Store new a trade', TradeMock.store))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storeTradeDto: StoreTradeDto) {
    return this.tradesService.store(storeTradeDto);
  }

  @ResponseMessage('Update trade by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update trade by id' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.OK, 'Update trade by id', TradeMock.update))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.update(id, updateTradeDto);
  }

  @ResponseMessage('Delete trade by id')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete trade by id' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.OK, 'Delete trade by id', TradeMock.delete))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  remove(@Param('id') id: number) {
    return this.tradesService.remove(id);
  }
}
