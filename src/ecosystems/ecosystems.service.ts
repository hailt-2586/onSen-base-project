import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoolsService } from '../pools/pools.service';
import { getCurrentDate } from '@shared/utils/common.util';
import { Ecosystem } from './entites/ecosystem.entity';
import { StoreEcosystemDto } from './dto/store-ecosystem.dto';
import { UpdateEcosystemDto } from './dto/update-ecosystem.dto';

@Injectable()
export class EcosystemsService {
  constructor(
    @InjectRepository(Ecosystem)
    private readonly ecosystemRepository: Repository<Ecosystem>,
    @Inject(forwardRef(() => PoolsService))
    private readonly poolsService: PoolsService,
  ) {}

  async store(storeEcosystemDto: StoreEcosystemDto) {
    // check pool exist
    const pool = await this.poolsService.findById(storeEcosystemDto.pool_id);
    const ecosystem = await this.ecosystemRepository.save({
      ...storeEcosystemDto,
      pool,
    });

    return {
      id: ecosystem.id,
      created_at: ecosystem.created_at,
    };
  }

  async findById(id: number) {
    const ecosystem = await this.ecosystemRepository.findOneBy({ id });
    if (!ecosystem) {
      throw new NotFoundException(`Ecosystem with id ${id} not found`);
    }

    return ecosystem;
  }

  async update(id: number, updateEcosystemDto: UpdateEcosystemDto) {
    const ecosystem = await this.findById(id);
    await this.ecosystemRepository.update({ id }, { ...updateEcosystemDto });

    return {
      id: ecosystem.id,
      updated_at: ecosystem.updated_at,
    };
  }

  async remove(id: number) {
    await this.findById(id);
    await this.ecosystemRepository.delete({ id });

    return {
      id,
      deleted_at: getCurrentDate(),
    };
  }
}
