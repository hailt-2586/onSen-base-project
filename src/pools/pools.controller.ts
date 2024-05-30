import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PoolsService } from './pools.service';
import { Public, ResponseMessage } from '@shared/decorators/common.decorator';
import { StorePoolDto } from './dto/store-pool.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { exampleErrorResponse, exampleSuccessResponse } from '@shared/utils/common.util';
import { ErrorResponseDto } from '@shared/dto/common.dto';
import { E_STATUS } from '@shared/enums/common.enum';
import { PoolMock } from '@shared/utils/mocks/pool.mock';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('pools')
@ApiTags('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @ResponseMessage('Store new a pool')
  @Post()
  @ApiOperation({ summary: 'Store new a pool' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.CREATED, 'Store new a pool', PoolMock.store))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  store(@Body() storePoolDto: StorePoolDto) {
    return this.poolsService.store(storePoolDto);
  }

  @Public()
  @ResponseMessage('Get list pools')
  @Get()
  @ApiOperation({ summary: 'Get list pools' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'status', required: false, enum: E_STATUS, example: E_STATUS.LIVE })
  @ApiQuery({ name: 'chain', required: false, type: String, example: 'ethereum' })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'example search' })
  @ApiQuery({ name: 'sort', required: false, type: String, example: 'created_at,asc' })
  @ApiResponse(exampleSuccessResponse(HttpStatus.OK, 'Get list pools', PoolMock.listPool))
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async findAll(
    @Query('page', new DefaultValuePipe(10), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number = 10,
    @Query('status') status: E_STATUS | string = '',
    @Query('chain') chain: string = '',
    @Query('search') search: string = '',
    @Query('sort') sort: string = '',
  ) {
    return this.poolsService.findAll({ page, limit }, { status, chain }, search, sort);
  }

  @Public()
  @ResponseMessage('Get pool by id with information')
  @Get(':id/information')
  @ApiOperation({ summary: 'Get pool by id with information' })
  @ApiResponse(
    exampleSuccessResponse(
      HttpStatus.OK,
      'Get pool by id with information',
      PoolMock.poolWithInformation,
    ),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async findInformationInPool(@Param('id') id: number) {
    return this.poolsService.findInformationInPool(id);
  }

  @Public()
  @ResponseMessage('Get pool by id with details')
  @Get(':id/details')
  @ApiOperation({ summary: 'Get pool by id with details' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Get pool by id with details', PoolMock.poolWithDetails),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async findDetailsInPool(@Param('id') id: number) {
    return this.poolsService.findDetailsInPool(id);
  }

  @Public()
  @ResponseMessage('Get pool by id with trades')
  @Get(':id/trades')
  @ApiOperation({ summary: 'Get pool by id with trades' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'sort', required: false, type: String, example: 'trade_date,asc' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Get pool by id with trades', PoolMock.poolWithTrades),
  )
  @ApiResponse(exampleErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorResponseDto))
  async findTradesInPool(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'trade_date,asc',
  ) {
    const options: IPaginationOptions = { page, limit };
    return this.poolsService.findTradesInPool(id, options, sort);
  }
}
