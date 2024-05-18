import { Module } from '@nestjs/common';
import { PoolDetailsService } from './pool-details.service';
import { PoolDetailsController } from './pool-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolDetails } from './entites/pool-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PoolDetails])],
  exports: [PoolDetailsService],
  controllers: [PoolDetailsController],
  providers: [PoolDetailsService],
})
export class PoolDetailsModule {}
