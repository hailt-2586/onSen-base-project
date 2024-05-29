import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entites/pool.entity';
import { Price } from '../prices/entites/price.entity';
import { PricesService } from '../prices/prices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pool, Price])],
  exports: [PoolsService],
  controllers: [PoolsController],
  providers: [PoolsService, PricesService],
})
export class PoolsModule {}
