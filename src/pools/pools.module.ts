import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entites/pool.entity';
import { PoolDetails } from '../pool-details/entites/pool-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pool, PoolDetails])],
  exports: [PoolsService],
  controllers: [PoolsController],
  providers: [PoolsService],
})
export class PoolsModule {}
