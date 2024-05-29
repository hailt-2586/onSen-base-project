import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
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

@Controller('pools')
@ApiTags('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @ResponseMessage('Store new a pool')
  @Post()
  @ApiOperation({ summary: 'Store new a pool' })
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.CREATED, 'Store new a pool', {
      id: 1,
      created_at: '2024-05-20T19:49:52.062Z',
    }),
  )
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
  @ApiResponse(
    exampleSuccessResponse(HttpStatus.OK, 'Get list pools', {
      items: [
        {
          pool_id: 1,
          pool_project_name: 'Project name',
          pool_ticker: 'TICKER',
          pool_participants: 1234,
          pool_funds_raised: '12345678.00000000',
          pool_live_until: null,
          pool_status: 'Upcoming',
          pool_opens_on: null,
          pool_chain: 'ETH',
          pool_start_date: null,
          pool_curator: 'ETH',
          pool_created_at: '2024-05-28T00:54:54.101Z',
          pool_updated_at: '2024-05-28T00:54:54.101Z',
        },
      ],
      meta: {
        totalItems: 1,
        itemCount: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    }),
  )
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
}
