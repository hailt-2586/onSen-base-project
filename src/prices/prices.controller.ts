import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { PricesService } from './prices.service';
import { UpdatePriceDto } from './dto/update-price.dto';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { PriceMock } from '@shared/utils/mocks/price.mock';

@Controller('prices')
@ApiTags('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @ResponseMessage('Update price by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update price by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Get user by wallet_address', PriceMock.update),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(id, updatePriceDto);
  }
}
