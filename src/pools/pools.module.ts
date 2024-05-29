import { forwardRef, Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entites/pool.entity';
import { Price } from '../prices/entites/price.entity';
import { PriceHistory } from '../price_history/entites/price_history.entity';
import { PricesModule } from '../prices/prices.module';
import { PriceHistoryModule } from '../price_history/price_history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pool, Price, PriceHistory]),
    forwardRef(() => PricesModule),
    forwardRef(() => PriceHistoryModule),
  ],
  exports: [PoolsService],
  controllers: [PoolsController],
  providers: [PoolsService],
})
export class PoolsModule {}
