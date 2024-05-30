import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PoolDetailsService } from './pool_details.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { StorePoolDetailsDto } from './dto/store-pool-details.dto';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { UpdatePoolDetailsDto } from './dto/update-pool-details.dto';
import { PoolDetailsMock } from '@shared/utils/mocks/pool-details.mock';

@Controller('pool-details')
@ApiTags('pool details')
export class PoolDetailsController {
  constructor(private readonly poolDetailsService: PoolDetailsService) {}

  @ResponseMessage('Store new a pool details')
  @Post()
  @ApiOperation({ summary: 'Store new a pool details' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a pool details', PoolDetailsMock.store),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storePoolDetailsDto: StorePoolDetailsDto) {
    return this.poolDetailsService.store(storePoolDetailsDto);
  }

  @ResponseMessage('Update pool detail by id')
  @Patch(':id')
  @ApiOperation({ summary: 'Update pool detail by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Update pool detail by id', PoolDetailsMock.update),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  update(@Param('id') id: number, @Body() updatePoolDetailsDto: UpdatePoolDetailsDto) {
    return this.poolDetailsService.update(id, updatePoolDetailsDto);
  }

  @ResponseMessage('Delete pool detail by id')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete pool detail by id' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Delete pool detail by id', PoolDetailsMock.delete),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  remove(@Param('id') id: number) {
    return this.poolDetailsService.remove(id);
  }
}
