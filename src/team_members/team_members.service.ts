import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './entites/team-members.entity';
import { Repository } from 'typeorm';
import { PoolsService } from '../pools/pools.service';
import { StoreTeamMemberDto } from './dto/store-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { getCurrentDate } from '@shared/utils/common.util';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
    @Inject(forwardRef(() => PoolsService))
    private readonly poolsService: PoolsService,
  ) {}

  async store(storeTeamMembersDto: StoreTeamMemberDto) {
    // check pool exist
    const pool = await this.poolsService.findById(storeTeamMembersDto.pool_id);
    const teamMember = await this.teamMemberRepository.save({
      ...storeTeamMembersDto,
      pool,
    });

    return {
      id: teamMember.id,
      created_at: teamMember.created_at,
    };
  }

  async findById(id: number) {
    const teamMember = await this.teamMemberRepository.findOneBy({ id });
    if (!teamMember) {
      throw new NotFoundException(`Team member with id ${id} not found`);
    }

    return teamMember;
  }

  async update(id: number, updateTeamMembersDto: UpdateTeamMemberDto) {
    const teamMember = await this.findById(id);
    await this.teamMemberRepository.update({ id }, { ...updateTeamMembersDto });

    return {
      id: teamMember.id,
      updated_at: teamMember.updated_at,
    };
  }

  async remove(id: number) {
    await this.findById(id);
    await this.teamMemberRepository.delete({ id });

    return {
      id,
      deleted_at: getCurrentDate(),
    };
  }
}
