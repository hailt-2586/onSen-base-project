import { forwardRef, Module } from '@nestjs/common';
import { PriceHistoryService } from './price_history.service';
import { PriceHistoryController } from './price_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceHistory } from './entites/price_history.entity';
import { Pool } from '../pools/entites/pool.entity';
import { PoolsModule } from '../pools/pools.module';

@Module({
  imports: [TypeOrmModule.forFeature([PriceHistory, Pool]), forwardRef(() => PoolsModule)],
  exports: [PriceHistoryService],
  controllers: [PriceHistoryController],
  providers: [PriceHistoryService],
})
export class PriceHistoryModule {}
