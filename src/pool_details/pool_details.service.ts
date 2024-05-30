import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoolDetails } from './entites/pool-details.entity';
import { Repository } from 'typeorm';
import { PoolsService } from '../pools/pools.service';
import { StorePoolDetailsDto } from './dto/store-pool-details.dto';
import { getCurrentDate } from '@shared/utils/common.util';
import { UpdatePoolDetailsDto } from './dto/update-pool-details.dto';

@Injectable()
export class PoolDetailsService {
  constructor(
    @InjectRepository(PoolDetails)
    private readonly poolDetailsRepository: Repository<PoolDetails>,
    @Inject(forwardRef(() => PoolsService))
    private readonly poolsService: PoolsService,
  ) {}

  async store(storePoolDetailsDto: StorePoolDetailsDto) {
    // check pool exist
    await this.poolsService.findById(storePoolDetailsDto.pool_id);

    const poolDetails = await this.poolDetailsRepository.save(storePoolDetailsDto);

    return {
      id: poolDetails.id,
      created_at: poolDetails.created_at,
    };
  }

  async findById(id: number) {
    const poolDetails = await this.poolDetailsRepository.findOneBy({ id });
    if (!poolDetails) {
      throw new NotFoundException(`Pool details with id ${id} not found`);
    }

    return poolDetails;
  }

  async update(id: number, updatePoolDetailsDto: UpdatePoolDetailsDto) {
    const poolDetails = await this.findById(id);
    await this.poolDetailsRepository.update({ id }, { ...updatePoolDetailsDto });

    return {
      id: poolDetails.id,
      updated_at: poolDetails.updated_at,
    };
  }

  async remove(id: number) {
    await this.findById(id);
    await this.poolDetailsRepository.delete({ id });

    return {
      id,
      deleted_at: getCurrentDate(),
    };
  }
}
