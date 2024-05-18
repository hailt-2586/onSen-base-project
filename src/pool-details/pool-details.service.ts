import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoolDetails } from './entites/pool-details.entity';
import { StorePoolDetailsDto } from './dto/store-pool-details.dto';
import { UpdatePoolDetailsDto } from './dto/update-pool-details.dto';

@Injectable()
export class PoolDetailsService {
  constructor(
    @InjectRepository(PoolDetails)
    private readonly poolDetailsRepository: Repository<PoolDetails>,
  ) {}

  async create(storePoolDetailsDto: StorePoolDetailsDto): Promise<PoolDetails> {
    const poolDetails = this.poolDetailsRepository.create(storePoolDetailsDto);
    return this.poolDetailsRepository.save(poolDetails);
  }

  async findAll(): Promise<PoolDetails[]> {
    return this.poolDetailsRepository.find();
  }

  async findOne(id: number): Promise<PoolDetails> {
    return this.poolDetailsRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePoolDetailsDto: UpdatePoolDetailsDto): Promise<PoolDetails> {
    await this.poolDetailsRepository.update(id, updatePoolDetailsDto);
    return this.poolDetailsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.poolDetailsRepository.delete(id);
  }
}
