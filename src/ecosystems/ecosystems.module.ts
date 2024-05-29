import { forwardRef, Module } from '@nestjs/common';
import { EcosystemsService } from './ecosystems.service';
import { EcosystemsController } from './ecosystems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ecosystem } from './entites/ecosystem.entity';
import { Pool } from '../pools/entites/pool.entity';
import { PoolsModule } from '../pools/pools.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ecosystem, Pool]), forwardRef(() => PoolsModule)],
  exports: [EcosystemsService],
  controllers: [EcosystemsController],
  providers: [EcosystemsService],
})
export class EcosystemsModule {}
