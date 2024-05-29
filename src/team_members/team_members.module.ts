import { forwardRef, Module } from '@nestjs/common';
import { TeamMembersService } from './team_members.service';
import { TeamMembersController } from './team_members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './entites/team-members.entity';
import { Pool } from '../pools/entites/pool.entity';
import { PoolsModule } from '../pools/pools.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember, Pool]), forwardRef(() => PoolsModule)],
  exports: [TeamMembersService],
  controllers: [TeamMembersController],
  providers: [TeamMembersService],
})
export class TeamMembersModule {}
