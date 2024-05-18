import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoolDetailsService } from './pool-details.service';
import { StorePoolDetailsDto } from './dto/store-pool-details.dto';
import { UpdatePoolDetailsDto } from './dto/update-pool-details.dto';

@Controller('pool-details')
export class PoolDetailsController {
  constructor(private readonly poolDetailsService: PoolDetailsService) {}

  @Post()
  create(@Body() storePoolDetailsDto: StorePoolDetailsDto) {
    return this.poolDetailsService.create(storePoolDetailsDto);
  }

  @Get()
  findAll() {
    return this.poolDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poolDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoolDetailsDto: UpdatePoolDetailsDto) {
    return this.poolDetailsService.update(+id, updatePoolDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poolDetailsService.remove(+id);
  }
}
