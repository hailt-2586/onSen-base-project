import { forwardRef, Module } from '@nestjs/common';
import { PoolDetailsService } from './pool_details.service';
import { PoolDetailsController } from './pool_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolDetails } from './entites/pool-details.entity';
import { Pool } from '../pools/entites/pool.entity';
import { PoolsModule } from '../pools/pools.module';

@Module({
  imports: [TypeOrmModule.forFeature([PoolDetails, Pool]), forwardRef(() => PoolsModule)],
  exports: [PoolDetailsService],
  controllers: [PoolDetailsController],
  providers: [PoolDetailsService],
})
export class PoolDetailsModule {}
