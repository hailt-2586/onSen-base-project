import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entites/price.entity';
import { Pool } from '../pools/entites/pool.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price, Pool])],
  exports: [PricesService],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
