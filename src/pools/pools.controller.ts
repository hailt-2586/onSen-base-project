import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { ResponseMessage } from '@shared/decorators/common.decorator';
import { StorePoolDto } from './dto/store-pool.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @ResponseMessage('Store a new pool')
  @Post()
  store(@Body() storePoolDto: StorePoolDto) {
    return this.poolsService.store(storePoolDto);
  }

  @ResponseMessage('Get list pools')
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.poolsService.findAll(paginationDto);
  }
}
