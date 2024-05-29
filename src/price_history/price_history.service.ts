import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from './entites/price_history.entity';
import { Repository } from 'typeorm';
import { StorePriceHistoryDto } from './dto/store-price-history.dto';
import { PoolsService } from '../pools/pools.service';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
    @Inject(forwardRef(() => PoolsService))
    private readonly poolsService: PoolsService,
  ) {}

  async store(storePriceHistoryDto: StorePriceHistoryDto) {
    // check pool exist
    await this.poolsService.findById(storePriceHistoryDto.pool_id);

    const priceHistory = await this.priceHistoryRepository.save(storePriceHistoryDto);

    return {
      id: priceHistory.id,
      created_at: priceHistory.created_at,
    };
  }
}
