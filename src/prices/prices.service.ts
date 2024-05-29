import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entites/price.entity';
import { StorePriceDto } from './dto/store-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async store(storePriceDto: StorePriceDto) {
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
