import { forwardRef, Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entites/trade.entity';
import { Pool } from '../pools/entites/pool.entity';
import { PoolsModule } from '../pools/pools.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, Pool]), forwardRef(() => PoolsModule)],
  exports: [TradesService],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}
