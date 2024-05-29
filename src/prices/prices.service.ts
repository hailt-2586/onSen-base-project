import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entites/price.entity';
import { StorePriceDto } from './dto/store-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PoolsService } from '../pools/pools.service';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @Inject(forwardRef(() => PoolsService))
    private readonly poolsService: PoolsService,
  ) {}

  async store(storePriceDto: StorePriceDto) {
    // check pool exist
    await this.poolsService.findById(storePriceDto.pool_id);

    const price = await this.priceRepository.save(storePriceDto);

    return {
      id: price.id,
      created_at: price.created_at,
    };
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    const price = await this.priceRepository.findOneBy({ id });
    if (!price) {
      throw new NotFoundException(`Price with id ${id} not found`);
    }

    await this.priceRepository.update({ id }, { ...updatePriceDto });

    return {
      id: price.id,
      updated_at: price.updated_at,
    };
  }
}
